import { Router } from "express";

const router = Router();

router.get("/", async (_req, res) => {
  res.render("index");
});

router.get("/events", async (_req, res) => {
  res.render("events");
});

export const rootController = router;
