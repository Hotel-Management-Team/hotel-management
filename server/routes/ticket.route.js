import { Router } from "express";
import verifyToken from '../middlewares/auth.middleware';
import { getTicket, postTicket, putTicket, deleteTicket, getTicketList } from "../controllers/ticket.controller";

const router = Router();

router.get('/', verifyToken, getTicket);

router.post('/list', verifyToken, getTicketList);

router.post('/', verifyToken, postTicket);

router.put('/:id', verifyToken, putTicket);

router.delete('/:id', verifyToken, deleteTicket);

export default router;
