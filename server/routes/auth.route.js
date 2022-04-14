import { Router } from 'express';
import verifyToken from '../middlewares/auth.middleware';

import { postLogin, getAuth } from '../controllers/auth.controller';

const router = Router();

router.get('/', verifyToken, getAuth);

router.post('/login', postLogin);

export default router;