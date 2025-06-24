import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as postService from '../services/postService';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createPost = (req: AuthRequest, res: Response, next: NextFunction): void => {
  (async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.user) {
      res.status(401).json({ msg: 'User not authenticated' });
      return;
    }

    const { title, content } = req.body;
    const authorId = req.user.id;

    try {
      const post = await postService.createNewPost(title, content, authorId);
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  })();
};

export const getPosts = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    try {
      const authorId = req.query.author as string | undefined;
      const posts = await postService.getAllPosts(authorId);
      res.json(posts);
    } catch (err) {
      next(err);
    }
  })();
};

export const getPostById = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ msg: 'Invalid post ID' });
      return;
    }

    try {
      const post = await postService.getPost(id);
      if (!post) {
        res.status(404).json({ msg: 'Post not found' });
        return;
      }
      res.json(post);
    } catch (err) {
      next(err);
    }
  })();
};
