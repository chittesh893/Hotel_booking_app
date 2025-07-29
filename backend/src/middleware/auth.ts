import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access denied. No token provided.'
                
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await User.findById(decoded.userId).select('-password');
        const verify = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token. User not found.'
            });
        }

        req.user = user;
        next();
        return;
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            error: 'Invalid token.'
        });
    }
};

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await auth(req, res, () => { });

        if (req.user?.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Access denied. Admin privileges required.'
            });
        }

        next();
        return;
    } catch (error) {
        console.error('Admin auth middleware error:', error);
        return res.status(401).json({
            success: false,
            error: 'Authentication failed.'
        });
    }
}; 