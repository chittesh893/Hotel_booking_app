import express, { Response } from 'express';
import { uploadSingle, uploadMultiple, handleUploadError } from '../middleware/upload';
import { auth } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();

// Upload single image
router.post('/single', auth, uploadSingle, handleUploadError, (req: AuthRequest, res: Response): void => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
            return;
        }

        // Create the full URL for the uploaded image
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        res.json({
            success: true,
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                url: imageUrl
            },
            message: 'Image uploaded successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: 'Failed to upload image'
        });
    }
});

// Upload multiple images
router.post('/multiple', auth, uploadMultiple, handleUploadError, (req: AuthRequest, res: Response): void => {
    try {
        if (!req.files || req.files.length === 0) {
            res.status(400).json({
                success: false,
                error: 'No files uploaded'
            });
            return;
        }

        const uploadedFiles = (req.files as Express.Multer.File[]).map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        }));

        res.json({
            success: true,
            data: {
                files: uploadedFiles,
                count: uploadedFiles.length
            },
            message: `${uploadedFiles.length} image(s) uploaded successfully`
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: 'Failed to upload images'
        });
    }
});

// Delete image
router.delete('/:filename', auth, (req: AuthRequest, res: Response): void => {
    try {
        const { filename } = req.params;
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(__dirname, '../../uploads', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({
                success: true,
                message: 'Image deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Image not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete image'
        });
    }
});

export default router; 