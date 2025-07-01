import { Router, Request, Response } from "express";
import { z } from "zod";
import { sendErrorResponse } from "@/utils/send-response";

const router = Router();

let fanSpeed = 0;
let autoMode = false;

const fanSchema = z.object({
  fanSpeed: z.number().int(),
  autoMode: z.boolean(),
});

// GET /api/fan
router.get("/", (_req: Request, res: Response) => {
  try {
    res.json({
      fanSpeed,
      autoMode,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

// POST /api/fan
router.post("/", (req: Request, res: Response) => {
  try {
    const data = fanSchema.parse(req.body);

    fanSpeed = data.fanSpeed;
    autoMode = data.autoMode;

    res.status(201).json({ message: "Configuração de ventilador atualizada." });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const fanController = router;
