import { Request, Response, NextFunction } from 'express';

export const uploadImage = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.file) {
      const err = new Error('No file uploaded.');
      (err as any).statusCode = 400;
      throw err;
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (err) {
    next(err);
  }
}; 