import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../validators/auth.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/me', protect, me);

export default router;
