import mongoose, { Schema } from 'mongoose';
import { IHotel } from '../types';

const hotelSchema = new Schema<IHotel>({
    userId: {
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
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'State is required']
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        }
    },
    amenities: [{
        type: String,
        trim: true
    }],
    images: [{
        type: String,
        required: [true, 'At least one image is required']
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    priceRange: {
        min: {
            type: Number,
            required: [true, 'Minimum price is required']
        },
        max: {
            type: Number,
            required: [true, 'Maximum price is required']
        }
    }
}, {
    timestamps: true
});

export default mongoose.model<IHotel>('Hotel', hotelSchema); 