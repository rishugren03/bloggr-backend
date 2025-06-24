import { body } from 'express-validator';

export const signupValidation = [
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password').not().isEmpty().withMessage('Password is required.'),
];

export const postValidation = [
  body('title').not().isEmpty().withMessage('Title is required.'),
  body('content').not().isEmpty().withMessage('Content is required.'),
]; 