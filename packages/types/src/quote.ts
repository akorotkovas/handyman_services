import { z } from "zod";

export const createQuoteRequestSchema = z.object({
  serviceId: z.string().min(1, "Paslauga privaloma"),
  title: z
    .string()
    .min(10, "Pavadinimas turi būti bent 10 simbolių")
    .max(200, "Pavadinimas negali viršyti 200 simbolių"),
  description: z
    .string()
    .min(30, "Aprašymas turi būti bent 30 simbolių")
    .max(5000, "Aprašymas negali viršyti 5000 simbolių"),
  city: z.string().min(1, "Miestas privalomas"),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  budgetMin: z.number().positive().optional(),
  budgetMax: z.number().positive().optional(),
  preferredDate: z.string().optional(),
  urgency: z.enum(["EMERGENCY", "URGENT", "FLEXIBLE", "PLANNED"]),
});

export const quoteMilestoneSchema = z.object({
  title: z.string().min(3, "Etapo pavadinimas privalomas"),
  description: z.string().optional(),
  amount: z.number().positive("Suma turi būti teigiama"),
  percentage: z.number().min(0).max(100),
  sortOrder: z.number().int().min(0),
});

export const submitQuoteSchema = z.object({
  quoteRequestId: z.string().min(1),
  totalPrice: z.number().positive("Kaina turi būti teigiama"),
  description: z
    .string()
    .min(20, "Aprašymas turi būti bent 20 simbolių")
    .max(5000),
  estimatedDays: z.number().int().positive().optional(),
  validUntil: z.string(),
  milestones: z
    .array(quoteMilestoneSchema)
    .min(1, "Bent vienas etapas privalomas"),
});

export type CreateQuoteRequestInput = z.infer<typeof createQuoteRequestSchema>;
export type QuoteMilestoneInput = z.infer<typeof quoteMilestoneSchema>;
export type SubmitQuoteInput = z.infer<typeof submitQuoteSchema>;
