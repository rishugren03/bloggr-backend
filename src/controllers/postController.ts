import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/Post';
import mongoose from 'mongoose';
import slugify from 'slugify';

interface AuthRequest extends Request {
    user?: { id: string };
}

export const createPost = async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { title, content } = req.body;
    const author = req.user?.id;

    try {
        let slug = slugify(title, { lower: true, strict: true });
        
        // Ensure slug is unique
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            slug = `${slug}-${Date.now()}`;
        }
        
        const newPost = new Post({
            title,
            slug,
            content,
            author,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(err);
        }
        res.status(500).send('Server Error');
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const authorId = req.query.author as string;
        const filter = authorId ? { author: authorId } : {};

        const posts = await Post.find(filter).populate('author', 'email');
        res.json(posts);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(err);
        }
        res.status(500).send('Server Error');
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ msg: 'Invalid Post ID' });
        return;
    }
    try {
        const post = await Post.findById(req.params.id).populate('author', 'email');
        if (!post) {
            res.status(404).json({ msg: 'Post not found' });
            return;
        }
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
}; 