import { Router } from "express";
import verifyChargeManage from "../middlewares/charge.middleware";
import {
  getCharge,
  addCharge,
  deleteCharge,
  updateCharge,
} from "../controllers/charge.controller";

const router = Router();

router.get("/", verifyChargeManage, getCharge);

router.post("/", verifyChargeManage, addCharge);

router.delete("/:_id", verifyChargeManage, deleteCharge);

router.put("/:_id", verifyChargeManage, updateCharge);

export default router;
