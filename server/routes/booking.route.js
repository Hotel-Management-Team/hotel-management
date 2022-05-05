import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware";

import {
  getBooking,
  getBookingByBlock,
  getWaitingBookings,
  getUsingBookings,
  getAvailableBookings,
  getNeedCleanBookings,
  checkinBooking,
  checkoutBooking,
  cleanRoom,
  cancelBooking,
  getAllBookings,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", verifyToken, getBooking);
router.get("/all", verifyToken, getBooking);

router.get("/byblock", verifyToken, getBookingByBlock);
router.get("/waiting", verifyToken, getWaitingBookings);
router.get("/using", verifyToken, getUsingBookings);
router.get("/available", verifyToken, getAvailableBookings);
router.get("/needclean", verifyToken, getNeedCleanBookings);
router.put("/checkin/:id", verifyToken, checkinBooking);
router.put("/checkout/:id/:total", verifyToken, checkoutBooking);
router.put("/clean/:id", verifyToken, cleanRoom);
router.delete("/cancel/:id", verifyToken, cancelBooking);

export default router;
