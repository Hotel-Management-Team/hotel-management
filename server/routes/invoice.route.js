import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";
import Invoice from "../models/invoice.model";
import {
  getInvoice,
  postInvoice,
  putInvoice,
} from "../controllers/invoice.controller";

const router = Router();

router.get("/", verifyToken, getInvoice);

router.post("/", verifyToken, postInvoice);

router.put("/", verifyToken, putInvoice);

export default router;
