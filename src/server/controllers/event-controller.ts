import { EventDataSchema } from "@/schemas";
import {
  sendCreatedResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "@/utils/send-response";
import { Request, Response, Router } from "express";
import { Event } from "../db/models/event-model";

const router = Router();

// GET /api/event
router.get("/", async (_req: Request, res: Response) => {
  const events = await Event.findAll({
    raw: true,
    order: [["timestamp", "DESC"]],
    limit: 20,
  });

  sendSuccessResponse(res, events);
});

// POST /api/event
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = EventDataSchema.parse(req.body);

    await Event.create({
      ...data,
      timestamp: new Date(),
    });

    sendCreatedResponse(res);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const eventController = router;
