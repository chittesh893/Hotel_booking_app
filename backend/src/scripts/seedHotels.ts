import mongoose from 'mongoose';
import Hotel from '../models/Hotel';
import User from '../models/User';
import { SAMPLE_HOTELS } from '../../frontend/src/lib/constants';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking';

async function seedHotels() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing hotels
        await Hotel.deleteMany({});
        console.log('Cleared existing hotels');

        // Get a user to assign as owner (or create one if none exists)
        let user = await User.findOne();
        if (!user) {
            console.log('No users found. Creating a test user...');
            user = new User({
                name: 'Test Hotel Owner',
                email: 'hotelowner@test.com',
                password: 'password123',
                phone: '+91-98765-43210',
                role: 'user'
            });
            await user.save();
            console.log('Created test user:', user.email);
        }

        // Create hotels with the user as owner
        const hotelsWithOwner = SAMPLE_HOTELS.map(hotel => ({
            ...hotel,
            ownerId: user._id
        }));

        const createdHotels = await Hotel.insertMany(hotelsWithOwner);
        console.log(`Successfully seeded ${createdHotels.length} hotels`);

        // Log the created hotels
        createdHotels.forEach(hotel => {
            console.log(`- ${hotel.name} (${hotel.location.city}, ${hotel.location.state})`);
        });

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the seeding function
seedHotels(); 