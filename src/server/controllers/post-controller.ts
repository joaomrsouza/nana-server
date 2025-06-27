// import { Post } from "@/db/models";
import { sendErrorResponse } from "@/utils/send-response";
import { Request, Response, Router } from "express";

const router = Router();

// Get all posts
router.get("/", async (_req: Request, res: Response) => {
  try {
    // const posts = await Post.findAll();
    // sendSuccessResponse(res, posts);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

// Create a new post
router.post("/", async (_req: Request, res: Response) => {
  try {
    // const data = PostSchema.parse(req.body);
    // const post = await Post.create(data);
    // sendCreatedResponse(res, post);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export const postController = router;
