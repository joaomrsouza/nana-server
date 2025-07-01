import { Router, Request, Response } from "express";
import { z } from "zod";
import { sendErrorResponse } from "@/utils/send-response";

const router = Router();

const temperatureReadings: number[] = [];
const movementReadings: boolean[] = [];
const noiseReadings: number[] = [];

const postDataSchema = z.object({
  temperature: z.number(),
  noiseLevel: z.number().int(),
  tempSensorStatus: z.boolean(),
  movSensorStatus: z.boolean(),
  noiseSensorStatus: z.boolean(),
});

// GET /api/data
router.get("/", (_req: Request, res: Response) => {
  try {
    res.json({
      temperatureReadings,
      movementReadings,
      noiseReadings,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

// POST /api/data
router.post("/", (req: Request, res: Response) => {
  try {
    const data = postDataSchema.parse(req.body);

    if (data.tempSensorStatus) {
      temperatureReadings.push(data.temperature);
    }

    if (data.movSensorStatus) {
      movementReadings.push(true);
    }

    if (data.noiseSensorStatus) {
      noiseReadings.push(data.noiseLevel);
    }

    res.status(201).json({ message: "Dados recebidos com sucesso." });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const dataController = router;
