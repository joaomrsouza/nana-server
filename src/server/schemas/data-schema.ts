import { z } from "zod";

export const DeviceDataSchema = z.object({
  temperature: z.number().nullable(),
  noiseLevel: z.number().int().nullable(),
  movementDetected: z.boolean().nullable(),
  fanSpeed: z.number().int().min(0).max(255).nullable(),
  tempSensorStatus: z.boolean(),
  movSensorStatus: z.boolean(),
  noiseSensorStatus: z.boolean(),
});

export type DeviceDataSchemaType = z.infer<typeof DeviceDataSchema>;
