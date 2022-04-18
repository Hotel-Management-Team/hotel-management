import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getCharge } from "../controllers/charge.controller";

const router = Router();

router.get("/", getCharge);

export default router;
