import { Response } from "express";
import z from "zod/v4";

export function sendSuccessResponse(res: Response, data: unknown) {
  res.status(200).json({ status: "success", message: "Success", data });
}

export function sendCreatedResponse(res: Response, data: unknown) {
  res.status(201).json({ status: "success", message: "Created", data });
}

export function sendErrorResponse(res: Response, error: unknown) {
  if (error instanceof z.ZodError) {
    res.status(400).json({ status: "error", message: z.prettifyError(error) });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({ status: "error", message: error.message });
    return;
  }

  res.status(500).json({ status: "error", message: "Erro desconhecido" });
}
