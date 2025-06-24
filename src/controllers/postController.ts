import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as postService from '../services/postService';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
    user?: { id: string };
}

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
        return res.status(401).json({ msg: 'User not authenticated' });
    }

    const { title, content } = req.body;
    const authorId = req.user.id;

    try {
        const post = await postService.createNewPost(title, content, authorId);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.query.author as string | undefined;
    try {
        const posts = await postService.getAllPosts(authorId);
        res.json(posts);
    } catch (err) {
        next(err);
    }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid post ID' });
    }

    try {
        const post = await postService.getPost(id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        next(err);
    }
}; 