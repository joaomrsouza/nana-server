import { z } from "zod";

export const FanControlSchema = z.object({
  autoMode: z.boolean(),
  fanSpeed: z.number().int().min(0).max(255),
});

export type FanControlSchemaType = z.infer<typeof FanControlSchema>;
