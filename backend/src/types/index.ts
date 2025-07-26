import { Request } from 'express';
import { Document, Types } from 'mongoose';

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
    name: string;
    description: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    amenities: string[];
    images: string[];
    rating: number;
    priceRange: {
        min: number;
        max: number;
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