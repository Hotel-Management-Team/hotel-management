import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getCharge, addCharge } from "../controllers/charge.controller";

const router = Router();

router.get("/", getCharge);

router.post("/", verifyToken, addCharge);

export default router;
