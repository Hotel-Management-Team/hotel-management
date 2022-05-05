import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";
import Invoice from "../models/invoice.model";
import {
  getInvoicePaid,
  getInvoiceUnPaid,
  postInvoice,
  putInvoice,
  getInvoices,
} from "../controllers/invoice.controller";

const router = Router();
router.get("/", verifyToken, getInvoices);

router.get("/paid", verifyToken, getInvoicePaid);

router.get("/unpaid", verifyToken, getInvoiceUnPaid);

router.post("/", verifyToken, postInvoice);

router.put("/", verifyToken, putInvoice);

export default router;
