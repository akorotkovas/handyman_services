import { z } from "zod";

export const tradespersonProfileSchema = z.object({
  type: z.enum(["INDIVIDUAL", "COMPANY"]),
  companyName: z.string().optional(),
  companyCode: z.string().optional(),
  vatCode: z.string().optional(),
  bio: z
    .string()
    .min(50, "Aprašymas turi būti bent 50 simbolių")
    .max(5000)
    .optional(),
  experience: z.number().int().min(0).max(60).optional(),
  city: z.string().min(1, "Miestas privalomas"),
  municipality: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  serviceRadius: z.number().int().min(5).max(200).default(30),
  phone: z
    .string()
    .regex(/^\+370\d{8}$/, "Telefonas turi būti formatu +370XXXXXXXX"),
  website: z.string().url().optional().or(z.literal("")),
});

export const tradespersonServiceSchema = z.object({
  serviceId: z.string().min(1),
  priceFrom: z.number().positive().optional(),
  priceTo: z.number().positive().optional(),
  priceUnit: z.enum(["PER_HOUR", "PER_DAY", "PER_METER", "PER_UNIT", "PER_JOB"]),
  description: z.string().max(500).optional(),
});

export const qualificationSchema = z.object({
  name: z.string().min(3, "Kvalifikacijos pavadinimas privalomas"),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

export type TradespersonProfileInput = z.infer<typeof tradespersonProfileSchema>;
export type TradespersonServiceInput = z.infer<typeof tradespersonServiceSchema>;
export type QualificationInput = z.infer<typeof qualificationSchema>;
