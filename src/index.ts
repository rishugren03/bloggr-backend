import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import apiRoutes from './routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Bloggr API is running!');
});

app.use('/api', apiRoutes);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
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