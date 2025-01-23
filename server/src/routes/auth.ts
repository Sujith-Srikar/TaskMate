const router = require("express").Router();
import {register, login, logout} from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router