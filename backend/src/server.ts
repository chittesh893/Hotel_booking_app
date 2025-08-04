import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/database';
import authRouter from './routes/auth';
import hotelsRouter from './routes/hotels';
import { auth } from './middleware/auth';
import { AuthRequest } from './types';

// Load environment variables
dotenv.config({ path: './config.env' });

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);

// Protected route example
app.get('/api/protected', auth, (req: AuthRequest, res: Response) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// API health check
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ message: 'Hotel Booking API is running!', status: 'healthy' });
});

// Handle React routing, return all requests to React app
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend will be served from: ${path.join(__dirname, 'frontend/dist')}`);
});


