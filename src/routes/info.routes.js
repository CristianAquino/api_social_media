import { Router } from "express";
import getInfoApi from "../controllers/info.controller.js";

const router = Router();

router.get("/", getInfoApi);

export default router;
