import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";

const router = Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPost);
router.put("/:postId", verifyToken, updatePost);
router.delete("/:postId", verifyToken, deletePost);
router.put("/:postId/like", verifyToken, likePost);

export default router;
