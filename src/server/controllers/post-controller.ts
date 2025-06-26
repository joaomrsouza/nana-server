import { Post } from "@/db/models";
import { PostSchema } from "@/schemas";
import { Request, Response, Router } from "express";
import z from "zod/v4";

const router = Router();

// Get all posts
router.get("/", async (_req: Request, res: Response) => {
  const posts = await Post.findAll();

  res.json({ message: "List of posts", posts });
});

// Create a new post
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = PostSchema.parse(req.body);

    const post = await Post.create(data);

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: z.prettifyError(error) });
      return;
    }

    res.status(500).json({ error: "Failed to create post" });
  }
});

export const postController = router;
