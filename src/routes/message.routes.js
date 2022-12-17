import { Router } from "express";
import { addMessage, getMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";

const router = Router();

router.post("/", verifyToken, addMessage);
router.get("/:chatId", verifyToken, getMessage);

export default router;
