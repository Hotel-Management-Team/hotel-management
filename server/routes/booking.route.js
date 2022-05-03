import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";

import {
  getBooking,
  getBookingByBlock,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", getBooking);
router.get("/byblock", getBookingByBlock);

export default router;
