import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import { AuthRequest } from '../types';
import Hotel from '../models/Hotel';

const router = express.Router();

// Create a new hotel
router.post('/', auth, [
    body('name').notEmpty().withMessage('Hotel name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('details').notEmpty().withMessage('Hotel details are required'),
    body('photo').notEmpty().withMessage('Hotel photo is required')
], async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        const { name, location, details, photo } = req.body;

        // Parse location into address components
        const addressParts = location.split(',').map((part: string) => part.trim());

        // Ensure we have at least basic location info
        if (addressParts.length < 2) {
            res.status(400).json({
                success: false,
                message: 'Please provide location in format: Street, City, State, ZipCode, Country'
            });
            return;
        }

        const address = {
            street: addressParts[0] || 'Unknown Street',
            city: addressParts[1] || 'Unknown City',
            state: addressParts[2] || 'Unknown State',
            zipCode: addressParts[3] || '00000',
            country: addressParts[4] || 'Unknown'
        };

        // Create new hotel with userId
        const hotel = new Hotel({
            userId: req.user!._id,
            name,
            description: details, // Use details as description
            address,
            amenities: [], // Can be enhanced later
            images: [photo], // Store the photo URL
            priceRange: {
                min: 0, // Default values, can be enhanced later
                max: 0
            }
        });

        await hotel.save();

        res.status(201).json({
            success: true,
            message: 'Hotel created successfully',
            data: hotel
        });

    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get all hotels
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const hotels = await Hotel.find().populate('userId', 'name email').sort({ createdAt: -1 });

        res.json({
            success: true,
            message: 'Hotels retrieved successfully',
            data: hotels
        });

    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get hotel by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('userId', 'name email');

        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }

        res.json({
            success: true,
            message: 'Hotel retrieved successfully',
            data: hotel
        });

    } catch (error) {
        console.error('Error fetching hotel:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Update hotel (only by owner)
router.put('/:id', auth, [
    body('name').notEmpty().withMessage('Hotel name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('details').notEmpty().withMessage('Hotel details are required'),
    body('photo').notEmpty().withMessage('Hotel photo is required')
], async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        const { name, location, details, photo } = req.body;
        const hotelId = req.params.id;

        // Find hotel and check ownership
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }

        // Check if user owns the hotel
        if (!hotel.userId) {
            res.status(403).json({
                success: false,
                message: 'This hotel was created before user ownership was implemented'
            });
            return;
        }

        if (hotel.userId.toString() !== req.user!._id.toString()) {
            res.status(403).json({
                success: false,
                message: 'You can only edit hotels you created'
            });
            return;
        }

        // Parse location into address components
        const addressParts = location.split(',').map((part: string) => part.trim());

        // Ensure we have at least basic location info
        if (addressParts.length < 2) {
            res.status(400).json({
                success: false,
                message: 'Please provide location in format: Street, City, State, ZipCode, Country'
            });
            return;
        }

        const address = {
            street: addressParts[0] || 'Unknown Street',
            city: addressParts[1] || 'Unknown City',
            state: addressParts[2] || 'Unknown State',
            zipCode: addressParts[3] || '00000',
            country: addressParts[4] || 'Unknown'
        };

        // Update hotel
        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            {
                name,
                description: details,
                address,
                images: [photo]
            },
            { new: true }
        ).populate('userId', 'name email');

        res.json({
            success: true,
            message: 'Hotel updated successfully',
            data: updatedHotel
        });

    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Delete hotel (only by owner)
router.delete('/:id', auth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const hotelId = req.params.id;

        // Find hotel and check ownership
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }

        // Check if user owns the hotel
        if (!hotel.userId) {
            res.status(403).json({
                success: false,
                message: 'This hotel was created before user ownership was implemented'
            });
            return;
        }

        if (hotel.userId.toString() !== req.user!._id.toString()) {
            res.status(403).json({
                success: false,
                message: 'You can only delete hotels you created'
            });
            return;
        }

        // Delete hotel
        await Hotel.findByIdAndDelete(hotelId);

        res.json({
            success: true,
            message: 'Hotel deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router; 