import mongoose, { Schema } from 'mongoose';
import { IHotel } from '../types';

const hotelSchema = new Schema<IHotel>({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false // Make it optional to handle existing hotels
    },
    name: {
        type: String,
        required: [true, 'Hotel name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Hotel description is required'],
        trim: true
    },
    location: {
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'State is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        coordinates: {
            latitude: {
                type: Number,
                required: false
            },
            longitude: {
                type: Number,
                required: false
            }
        }
    },
    images: [{
        type: String,
        required: [true, 'At least one image is required']
    }],
    amenities: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        default: 4.0,
        min: 0,
        max: 5
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Price per night is required'],
        min: 0
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD', 'EUR', 'GBP']
    },
    roomTypes: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        available: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    contact: {
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        website: {
            type: String,
            required: false
        }
    },
    policies: {
        checkIn: {
            type: String,
            default: '2:00 PM'
        },
        checkOut: {
            type: String,
            default: '11:00 AM'
        },
        cancellation: {
            type: String,
            default: 'Free cancellation up to 24 hours before check-in'
        },
        pets: {
            type: Boolean,
            default: false
        },
        smoking: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

export default mongoose.model<IHotel>('Hotel', hotelSchema); 