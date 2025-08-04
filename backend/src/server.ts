import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/database';
import authRouter from './routes/auth';
import hotelsRouter from './routes/hotels';
import uploadRouter from './routes/upload';
import { auth } from './middleware/auth';
import { AuthRequest } from './types';

// Load environment variables
dotenv.config({ path: './config.env' });

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'https://hotel-booking-app-dt3c.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to database
connectDB();


// Serve static files from the React app build directory
const frontendPath = path.join(__dirname, 'frontend/dist');
app.use(express.static(frontendPath));

// Serve uploaded images
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/upload', uploadRouter);

// Protected route example
app.get('/api/protected', auth, (req: AuthRequest, res: Response) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// API health check
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ message: 'Hotel Booking API is running!', status: 'healthy' });
});

// Debug route to check file structure
app.get('/api/debug/files', (req: Request, res: Response) => {
    const fs = require('fs');
    const frontendPath = path.join(__dirname, 'frontend/dist');
    try {
        const files = fs.readdirSync(frontendPath);
        res.json({
            frontendPath,
            files,
            exists: fs.existsSync(frontendPath),
            indexExists: fs.existsSync(path.join(frontendPath, 'index.html'))
        });
    } catch (error: any) {
        res.json({
            frontendPath,
            error: error.message,
            exists: false
        });
    }
});

// Handle React routing, return all requests to React app
app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(frontendPath, 'index.html');
    console.log('Looking for index.html at:', indexPath);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(404).send('Frontend not found. Please check the build process.');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend will be served from: ${frontendPath}`);
});


