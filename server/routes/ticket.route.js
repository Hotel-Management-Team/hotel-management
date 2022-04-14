import { Router } from "express";
import verifyToken from '../middlewares/auth.middleware';
import { getTicket, postTicket, putTicket, deleteTicket } from "../controllers/ticket.controller";

const router = Router();

router.get('/', getTicket);

router.post('/', postTicket);

router.put('/:id', putTicket);

router.delete('/:id', deleteTicket);

export default router;
