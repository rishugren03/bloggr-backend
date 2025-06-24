import { Router } from 'express';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/upload', uploadRoutes);

export default router; 