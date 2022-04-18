import { Router } from 'express';
import verifyToken from '../middlewares/auth.middleware';

import { getBooking } from '../controllers/booking.controller';

const router = Router();

router.get('/', getBooking);

export default router;