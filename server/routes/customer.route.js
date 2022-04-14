import { Router } from "express";
import verifyToken from '../middlewares/auth.middleware';
import { getCustomer, postCustomer, putCustomer, deleteCustomer } from "../controllers/customer.controller";

const router = Router();

router.get("/", getCustomer);

router.post("/", verifyToken, postCustomer);

router.put("/:id", verifyToken, putCustomer);

router.delete("/:id", verifyToken, deleteCustomer);

export default router;