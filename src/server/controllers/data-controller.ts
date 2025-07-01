import { Router, Request, Response } from "express";
import { DeviceDataSchema } from "../schemas/data-schema";
import { sendErrorResponse } from "@/utils/send-response";
import { Control } from "../db/models/control-model";

const router = Router();

// GET /api/data
router.get("/", async (_req: Request, res: Response) => {
  try {
    const keys = ["temperature", "movement", "noise"];
    const controls = await Control.findAll({ where: { name: keys } });

    const result: Record<string, number[]> = {};

    controls.forEach((entry) => {
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

    const ops = [];

    if (data.tempSensorStatus) {
      ops.push(
        Control.upsert({ name: "temperature", value: data.temperature.toString() }),
        Control.upsert({ name: "temperatureStatus", value: "true" })
      );
    }

    if (data.movSensorStatus) {
      ops.push(
        Control.upsert({ name: "movement", value: "1" }),
        Control.upsert({ name: "movementStatus", value: "true" })
      );
    }

    if (data.noiseSensorStatus) {
      ops.push(
        Control.upsert({ name: "noise", value: data.noiseLevel.toString() }),
        Control.upsert({ name: "noiseStatus", value: "true" })
      );
    }

    await Promise.all(ops);

    res.status(201).json({ message: "Dados salvos com sucesso no banco." });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const dataController = router;
