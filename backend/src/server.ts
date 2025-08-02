import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRouter from './routes/auth';
import hotelsRouter from './routes/hotels';
import { auth } from './middleware/auth';
import { AuthRequest } from './types';

// Load environment variables
dotenv.config({ path: './config.env' });

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;
const additionalPort = 8000;


// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hotel Booking API is running!');
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);

// Protected route example
app.get('/api/protected', auth, (req: AuthRequest, res: Response) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


