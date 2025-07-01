import {
  sendErrorResponse,
  sendSuccessResponse
} from "@/utils/send-response";
import { Request, Response, Router } from "express";
import { Control } from "../db/models/control-model";

const router = Router();

// GET /api/sensors
router.get("/", async (_req: Request, res: Response) => {
  try {
    const controls = await Control.findAll({
      where: { name: ["temperatureStatus", "movementStatus", "noiseStatus"] },
    });

    let temperatureStatus = false;
    let movementStatus = false;
    let noiseStatus = false;

    controls.forEach(entry => {
      const { name, value } = entry.get();

      if (name === "temperatureStatus") temperatureStatus = value === "true";
      if (name === "movementStatus") movementStatus = value === "true";
      if (name === "noiseStatus") noiseStatus = value === "true";
    });

    sendSuccessResponse(res, {
      temperatureStatus,
      movementStatus,
      noiseStatus,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const sensorsController = router;
