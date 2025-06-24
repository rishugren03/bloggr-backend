import { Router } from 'express';
import * as postController from '../controllers/postController';
import { postValidation } from '../utils/validation';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', protect, postValidation, postController.createPost);
router.get('/get', postController.getPosts);
router.get('/getbyid/:id', postController.getPostById);

export default router; 