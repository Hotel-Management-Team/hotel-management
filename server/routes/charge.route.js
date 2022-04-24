import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getCharge, addCharge, deleteCharge, updateCharge } from "../controllers/charge.controller";

const router = Router();

router.get("/", getCharge);

router.post("/", verifyToken, addCharge);

router.delete("/:_id", verifyToken, deleteCharge);

router.put("/:_id", verifyToken, updateCharge);

export default router;
