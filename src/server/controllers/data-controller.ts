import { NoiseReadings, TemperatureReadings } from "@/db/models";
import { sendCreatedResponse, sendErrorResponse } from "@/utils/send-response";
import { Request, Response, Router } from "express";
import { Control } from "../db/models/control-model";
import { DeviceDataSchema } from "../schemas/data-schema";

const router = Router();

// GET /api/data
router.get("/", async (_req: Request, res: Response) => {
  try {
    const keys = ["temperature", "movement", "noise"];
    const controls = await Control.findAll({ where: { name: keys } });

    const result: Record<string, number[]> = {};

    controls.forEach(entry => {
      const { name, value } = entry.get(); // extrai os campos reais do model
      const parsed = parseFloat(value);
      result[`${name}Readings`] = isNaN(parsed) ? [0] : [parsed];
    });

    res.json(result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

// POST /api/data
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = DeviceDataSchema.parse(req.body);

    await Promise.all([
      TemperatureReadings.create({
        temperature: data.temperature,
        timestamp: new Date(),
      }),

      NoiseReadings.create({
        noiseLevel: data.noiseLevel,
        timestamp: new Date(),
      }),

      Control.upsert({
        name: "temperatureStatus",
        value: data.tempSensorStatus.toString(),
      }),

      Control.upsert({
        name: "movementStatus",
        value: data.movSensorStatus.toString(),
      }),

      Control.upsert({
        name: "noiseStatus",
        value: data.noiseSensorStatus.toString(),
      }),

      Control.upsert({
        name: "fanSpeed",
        value: data.fanSpeed.toString(),
      }),

      Control.upsert({
        name: "fanMode",
        value: data.autoMode.toString(),
      }),
    ]);

    sendCreatedResponse(res);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const dataController = router;
