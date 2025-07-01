import { z } from "zod";

export const DeviceDataSchema = z.object({
  temperature: z.number(),
  noiseLevel: z.number().int(),
  tempSensorStatus: z.boolean(),
  movSensorStatus: z.boolean(),
  noiseSensorStatus: z.boolean(),
  fanSpeed: z.number().int().min(0).max(255),
  autoMode: z.boolean(),
});

export type DeviceDataSchemaType = z.infer<typeof DeviceDataSchema>;
