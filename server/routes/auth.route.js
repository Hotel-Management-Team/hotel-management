import { Router } from 'express';
import User from '../models/user.model';
import verifyToken from '../middlewares/auth.middleware';

import { postLogin, postRegister, getAuth } from '../controllers/auth.controller';

const router = Router();

router.get('/', verifyToken, getAuth);

router.post('/register', postRegister);

router.post('/login', postLogin);

export default router;