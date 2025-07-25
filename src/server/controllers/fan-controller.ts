import {
  sendCreatedResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "@/utils/send-response";
import { Request, Response, Router } from "express";
import { Control } from "../db/models/control-model";
import { FanControlSchema } from "../schemas/fan-schema";

const router = Router();

// GET /api/fan
router.get("/", async (_req: Request, res: Response) => {
  try {
    const controls = await Control.findAll({
      where: { name: ["fanSpeed", "fanAutoMode"] },
    });

    let fanSpeed = 0;
    let fanAutoMode = true;

    controls.forEach(entry => {
      const { name, value } = entry.get();

      if (name === "fanSpeed") fanSpeed = Number(value);
      if (name === "fanAutoMode") fanAutoMode = value === "true";
    });

    sendSuccessResponse(res, { fanSpeed, fanAutoMode });
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
      Control.upsert({
        name: "fanAutoMode",
        value: data.fanAutoMode.toString(),
      }),
    ]);

    sendCreatedResponse(res);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const fanController = router;
