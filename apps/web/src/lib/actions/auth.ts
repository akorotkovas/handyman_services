"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@meistrai/db";
import { registerSchema, type RegisterInput, type ActionResult } from "@meistrai/types";
import { rateLimit, RATE_LIMITS } from "@meistrai/services/rate-limit";
import { signIn } from "@/lib/auth";

export async function registerUser(
  input: RegisterInput
): Promise<ActionResult> {
  try {
    // Rate limit
    const rl = rateLimit(
      `register:${input.email}`,
      RATE_LIMITS.AUTH.limit,
      RATE_LIMITS.AUTH.windowMs
    );
    if (!rl.allowed) {
      return { success: false, error: "Per daug bandymų. Bandykite vėliau." };
    }

    // Validate
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message };
    }

    const { email, password, firstName, lastName, role } = parsed.data;
    const emailLower = email.toLowerCase();

    // Check existing
    const existing = await prisma.user.findUnique({
      where: { email: emailLower },
    });
    if (existing) {
      return { success: false, error: "Šis el. paštas jau užregistruotas" };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    await prisma.user.create({
      data: {
        email: emailLower,
        passwordHash,
        firstName,
        lastName,
        roles: [role],
        status: "ACTIVE",
      },
    });

    // TODO: Send verification email

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registracija nepavyko. Bandykite dar kartą." };
  }
}

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<ActionResult> {
  try {
    const rl = rateLimit(
      `login:${email}`,
      RATE_LIMITS.AUTH.limit,
      RATE_LIMITS.AUTH.windowMs
    );
    if (!rl.allowed) {
      return { success: false, error: "Per daug bandymų. Bandykite vėliau." };
    }

    await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Neteisingas el. paštas arba slaptažodis" };
  }
}
