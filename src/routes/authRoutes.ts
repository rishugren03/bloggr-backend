import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { signupValidation, loginValidation } from '../utils/validation';

const router = Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

export default router; 