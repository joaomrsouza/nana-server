import { Router, Request, Response } from "express";
import { FanControlSchema } from "../schemas/fan-schema";
import { sendErrorResponse } from "@/utils/send-response";
import { Control } from "../db/models/control-model";

const router = Router();

// GET /api/fan
router.get("/", async (_req: Request, res: Response) => {
  try {
    const controls = await Control.findAll({
      where: { name: ["fanSpeed", "fanMode"] },
    });

    let fanSpeed = 0;
    let autoMode = false;

    controls.forEach((entry) => {
      const { name, value } = entry.get();

      if (name === "fanSpeed") fanSpeed = parseInt(value, 10);
      if (name === "fanMode") autoMode = value === "true";
    });

    res.json({ fanSpeed, autoMode });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

// POST /api/fan
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = FanControlSchema.parse(req.body);

    await Promise.all([
      Control.upsert({ name: "fanSpeed", value: data.fanSpeed.toString() }),
      Control.upsert({ name: "fanMode", value: data.autoMode.toString() }),
    ]);

    res.status(201).json({ message: "Configuração do ventilador salva." });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const fanController = router;
