import { Router } from "express";

const router = Router();

router.get("/", async (_req, res) => {
  res.render("index");
});

export const rootController = router;
