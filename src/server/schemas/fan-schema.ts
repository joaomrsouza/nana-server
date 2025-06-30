import { z } from "zod";

export const FanControlSchema = z.object({
  autoMode: z.boolean(),
  fanSpeed: z.number().int().min(0).max(100), // Assumindo uma velocidade de 0 a 100
});

export type FanControlSchemaType = z.infer<typeof FanControlSchema>;