import { Router } from 'express';
import { createPost, getPosts, getPostById } from '../controllers/postController';
import { postValidation } from '../utils/validation';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', protect, postValidation, createPost);
router.get('/get', getPosts);
router.get('/getbyid/:id', getPostById);

export default router; 