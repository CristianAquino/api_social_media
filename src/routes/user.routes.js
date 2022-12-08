import { Router } from "express";
import { verifyToken } from "../middlewares/authJWT.js";
import {
  getUser,
  updateUser,
  deleteAccount,
  followUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, getUser);
router.put("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteAccount);
router.put("/:id/follow", verifyToken, followUser);

export default router;
