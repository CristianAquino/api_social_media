import { Router } from "express";
import {
  createChat,
  findChat,
  userChats,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";

const router = Router();

router.post("/", verifyToken, createChat);
router.get("/", verifyToken, userChats);
router.get("/find/:firstId/:secondId", verifyToken, findChat);

export default router;
