import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { checkDuplicateUsername } from "../middlewares/verifyUser.js";

const router = Router();

router.post("/register", checkDuplicateUsername, registerUser);
router.post("/login", loginUser);

export default router;
