import { Router } from "express";
import verifyToken from '../middlewares/auth.middleware';
import { getRoom, postRoom, putRoom, deleteRoom, findRoom } from "../controllers/room.controller";

const router = Router();

router.get('/', getRoom);

router.get('/findRoom', verifyToken, findRoom);

router.post('/', verifyToken, postRoom);

router.put('/:id', verifyToken, putRoom);

router.delete('/:id', verifyToken, deleteRoom);

export default router;