import { Request } from 'express';
import { Document, Types } from 'mongoose';

// Extend Request to include file properties for multer
declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
            files?: Express.Multer.File[];
        }
    }
}

// User types
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'user' | 'admin';
    comparePassword(candidatePassword: string): Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

// Request with user
export interface AuthRequest extends Request {
    user?: IUser;
}

// Hotel types
export interface IHotel extends Document {
    ownerId?: Types.ObjectId;
    name: string;
    description: string;
    location: {
        city: string;
        state: string;
        country: string;
        address: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    images: string[];
    amenities: string[];
    rating: number;
    pricePerNight: number;
    currency: string;
    roomTypes: {
        name: string;
        description: string;
        price: number;
        capacity: number;
        available: number;
    }[];
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    policies: {
        checkIn: string;
        checkOut: string;
        cancellation: string;
        pets: boolean;
        smoking: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

// Room types
export interface IRoom extends Document {
    hotelId: Types.ObjectId;
    roomNumber: string;
    type: string;
    capacity: number;
    price: number;
    amenities: string[];
    images: string[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Booking types
export interface IBooking extends Document {
    userId: Types.ObjectId;
    hotelId: Types.ObjectId;
    roomId: Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'pending' | 'paid' | 'failed';
    paymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
} 