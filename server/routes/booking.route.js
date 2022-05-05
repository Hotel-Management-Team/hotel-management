import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";

import {
  getBooking,
  getBookingByBlock,
  getWaitingBookings,
  getUsingBookings,
  getAvailableBookings,
  getNeedCleanBookings,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", verifyToken, getBooking);
router.get("/byblock", verifyToken, getBookingByBlock);
router.get("/waiting", verifyToken, getWaitingBookings);
router.get("/using", verifyToken, getUsingBookings);
router.get("/available", verifyToken, getAvailableBookings);
router.get("/needclean", verifyToken, getNeedCleanBookings);

export default router;
