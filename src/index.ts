import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import apiRoutes from './routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Bloggr API is running!');
});

app.use('/api', apiRoutes);

// Generic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = (err as any).statusCode || 500;
  const message = err.message || 'Something broke!';
  res.status(status).json({
    errors: [
      { msg: message }
    ]
  });
});

// Database connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }); 