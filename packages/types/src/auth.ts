import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Neteisingas el. pašto adresas"),
  password: z.string().min(1, "Slaptažodis privalomas"),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Vardas turi būti bent 2 simbolių")
      .max(50, "Vardas negali viršyti 50 simbolių"),
    lastName: z
      .string()
      .min(2, "Pavardė turi būti bent 2 simbolių")
      .max(50, "Pavardė negali viršyti 50 simbolių"),
    email: z.string().email("Neteisingas el. pašto adresas"),
    password: z
      .string()
      .min(8, "Slaptažodis turi būti bent 8 simbolių")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Slaptažodis turi turėti didžiąją, mažąją raidę ir skaičių"
      ),
    confirmPassword: z.string(),
    role: z.enum(["CUSTOMER", "TRADESPERSON"]),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Privalote sutikti su sąlygomis" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Slaptažodžiai nesutampa",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Neteisingas el. pašto adresas"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, "Slaptažodis turi būti bent 8 simbolių")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Slaptažodis turi turėti didžiąją, mažąją raidę ir skaičių"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Slaptažodžiai nesutampa",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
