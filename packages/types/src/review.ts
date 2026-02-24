import { z } from "zod";

const ratingField = z.number().int().min(1).max(5);

export const createReviewSchema = z.object({
  bookingId: z.string().min(1),
  overall: ratingField,
  quality: ratingField,
  reliability: ratingField,
  communication: ratingField,
  value: ratingField,
  comment: z.string().max(5000).optional(),
});

export const respondToReviewSchema = z.object({
  reviewId: z.string().min(1),
  response: z
    .string()
    .min(10, "Atsakymas turi būti bent 10 simbolių")
    .max(2000),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type RespondToReviewInput = z.infer<typeof respondToReviewSchema>;
