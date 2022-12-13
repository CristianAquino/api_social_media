import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  likePost,
  updatePost,
  uploadPostImage,
  getAllPost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";
import { verifyImage } from "../middlewares/verifyImage.js";

const router = Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPost);
router.get("/all", verifyToken, getAllPost);
router.post("/upload", [verifyToken, verifyImage], uploadPostImage);
router.put("/:postId", verifyToken, updatePost);
router.delete("/:postId/:imageId", verifyToken, deletePost);
router.put("/:postId/like", verifyToken, likePost);

export default router;
