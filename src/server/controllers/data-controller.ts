import { MovementReadings, NoiseReadings, TemperatureReadings } from "@/db/models";
import { sendCreatedResponse, sendErrorResponse, sendSuccessResponse } from "@/utils/send-response";
import { Request, Response, Router } from "express";
import { Control } from "../db/models/control-model";
import { DeviceDataSchema } from "../schemas/data-schema";

const router = Router();

// GET /api/data
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [temperatureReadings, movementReadings, noiseReadings] = await Promise.all([
      TemperatureReadings.findOne({ order: [["timestamp", "DESC"]] }),
      MovementReadings.findOne({ order: [["timestamp", "DESC"]] }),
      NoiseReadings.findOne({ order: [["timestamp", "DESC"]] }),
    ]);

    sendSuccessResponse(res, {
      temperatureReadings,
      movementReadings,
      noiseReadings,
    })
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

// POST /api/data
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = DeviceDataSchema.parse(req.body);

    const ops = [];

    if (data.temperature !== null) {
      ops.push(TemperatureReadings.create({
        temperature: data.temperature,
        timestamp: new Date(),
      }));
    }

    if (data.noiseLevel !== null) {
      ops.push(NoiseReadings.create({
        noiseLevel: data.noiseLevel,
        timestamp: new Date(),
      }));
    }

    if (data.movementDetected !== null) {
      ops.push(MovementReadings.create({
        movement: data.movementDetected,
        timestamp: new Date(),
      }));
    }

    if (data.fanAutoMode !== undefined) {
      ops.push(Control.upsert({
        name: "fanAutoMode",
        value: data.fanAutoMode.toString(),
      }));
    }

    if (data.fanSpeed !== null && data.fanAutoMode) {
      ops.push(Control.upsert({
        name: "fanSpeed",
        value: data.fanSpeed.toString(),
      }));
    }


    await Promise.all([
      ...ops,

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
    ]);

    sendCreatedResponse(res);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const dataController = router;
