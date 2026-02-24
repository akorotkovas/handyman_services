import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@meistrai/db";
import { loginSchema } from "@meistrai/types";

// Dummy hash for timing-oracle protection
const DUMMY_HASH = "$2b$12$LJ3m4ys3LQjKGOUa3kYhAOChUvFxoUL2r0BCT0AyGMbF.KgGACHIq";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "El. paštas", type: "email" },
        password: { label: "Slaptažodis", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });

        // Always compare to prevent timing attacks
        const hash = user?.passwordHash ?? DUMMY_HASH;
        const isValid = await bcrypt.compare(parsed.data.password, hash);
        if (!user || !isValid) return null;

        // Check status
        if (user.status === "BANNED" || user.status === "SUSPENDED") {
          return null;
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            roles: true,
            status: true,
            firstName: true,
            lastName: true,
          },
        });

        if (dbUser) {
          const u = session.user as unknown as Record<string, unknown>;
          u.id = dbUser.id;
          u.roles = dbUser.roles;
          u.status = dbUser.status;
          u.firstName = dbUser.firstName;
          u.lastName = dbUser.lastName;
        }
      }
      return session;
    },
    async signIn({ user, account }) {
      // For OAuth, auto-create user if needed
      if (account?.provider === "google" && user.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existing) {
          const nameParts = (user.name ?? "").split(" ");
          await prisma.user.create({
            data: {
              email: user.email,
              firstName: nameParts[0] || "Vartotojas",
              lastName: nameParts.slice(1).join(" ") || "",
              avatar: user.image,
              roles: ["CUSTOMER"],
              emailVerified: new Date(),
            },
          });
        }
      }
      return true;
    },
  },
};
