import { z } from "zod/v4";

export const FanControlSchema = z.object({
  fanAutoMode: z.boolean(),
  fanSpeed: z.number().int().min(0).max(255),
});

export type FanControlSchemaType = z.infer<typeof FanControlSchema>;
