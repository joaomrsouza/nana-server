import { z } from "zod/v4";

export const EventDataSchema = z.object({
  name: z.string(),
  extra: z.string().nullable(),
});

export type EventDataSchema = z.infer<typeof EventDataSchema>;