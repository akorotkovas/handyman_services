import { z } from "zod";

export const submitMilestoneSchema = z.object({
  milestoneId: z.string().min(1),
  notes: z.string().max(2000).optional(),
});

export const approveMilestoneSchema = z.object({
  milestoneId: z.string().min(1),
});

export const disputeMilestoneSchema = z.object({
  milestoneId: z.string().min(1),
  reason: z.enum([
    "POOR_QUALITY",
    "INCOMPLETE_WORK",
    "LATE_DELIVERY",
    "OVERCHARGED",
    "NO_SHOW",
    "DAMAGE",
    "SAFETY_CONCERN",
    "OTHER",
  ]),
  description: z
    .string()
    .min(20, "Aprašymas turi būti bent 20 simbolių")
    .max(5000),
});

export type SubmitMilestoneInput = z.infer<typeof submitMilestoneSchema>;
export type ApproveMilestoneInput = z.infer<typeof approveMilestoneSchema>;
export type DisputeMilestoneInput = z.infer<typeof disputeMilestoneSchema>;
