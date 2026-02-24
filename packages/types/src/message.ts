import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1),
  content: z
    .string()
    .min(1, "Žinutė negali būti tuščia")
    .max(5000, "Žinutė negali viršyti 5000 simbolių"),
});

export const startConversationSchema = z.object({
  recipientId: z.string().min(1),
  quoteRequestId: z.string().optional(),
  content: z
    .string()
    .min(1, "Žinutė negali būti tuščia")
    .max(5000),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type StartConversationInput = z.infer<typeof startConversationSchema>;
