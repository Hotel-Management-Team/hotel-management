import { Router } from 'express';
import { getUsers, postUser, putUser, deleteUser } from '../controllers/user.controller';
import verifyToken from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getUsers);

router.post('/', verifyToken, postUser);

router.put('/', verifyToken, putUser);

router.delete('/:id', verifyToken, deleteUser);

export default router;