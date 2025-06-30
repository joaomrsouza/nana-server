import { z } from "zod";


export const DeviceDataSchema = z.object({
  temperature: z.number(),
  noiseLevel: z.number().int(),
  tempSensorStatus: z.boolean(),
  movSensorStatus: z.boolean(),
  noiseSensorStatus: z.boolean(),
});

export type DeviceDataSchemaType = z.infer<typeof DeviceDataSchema>;