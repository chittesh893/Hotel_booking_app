const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel_booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const testHotels = [
    {
        name: "Grand Plaza Hotel",
        description: "Luxurious 5-star hotel in the heart of the city with stunning views and world-class amenities.",
        location: {
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            address: "123 Marine Drive, Mumbai"
        },
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
        ],
        amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Parking"],
        rating: 4.5,
        pricePerNight: 8000,
        currency: "INR",
        roomTypes: [
            {
                name: "Deluxe Room",
                description: "Spacious room with city view",
                price: 8000,
                capacity: 2,
                available: 10
            },
            {
                name: "Suite",
                description: "Luxury suite with ocean view",
                price: 15000,
                capacity: 4,
                available: 5
            }
        ],
        contact: {
            phone: "+91-22-12345678",
            email: "info@grandplaza.com",
            website: "https://grandplaza.com"
        },
        policies: {
            checkIn: "2:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 24 hours before check-in",
            pets: false,
            smoking: false
        }
    },
    {
        name: "Seaside Resort",
        description: "Beautiful beachfront resort with private beach access and tropical gardens.",
        location: {
            city: "Goa",
            state: "Goa",
            country: "India",
            address: "456 Beach Road, Calangute"
        },
        images: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
        ],
        amenities: ["WiFi", "Pool", "Restaurant", "Beach Access", "Spa"],
        rating: 4.8,
        pricePerNight: 12000,
        currency: "INR",
        roomTypes: [
            {
                name: "Beach View Room",
                description: "Room with direct beach view",
                price: 12000,
                capacity: 2,
                available: 8
            },
            {
                name: "Villa",
                description: "Private villa with pool",
                price: 25000,
                capacity: 6,
                available: 3
            }
        ],
        contact: {
            phone: "+91-832-1234567",
            email: "info@seasideresort.com",
            website: "https://seasideresort.com"
        },
        policies: {
            checkIn: "3:00 PM",
            checkOut: "12:00 PM",
            cancellation: "Free cancellation up to 48 hours before check-in",
            pets: true,
            smoking: false
        }
    },
    {
        name: "Business Center Hotel",
        description: "Modern business hotel with conference facilities and executive services.",
        location: {
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            address: "789 MG Road, Bangalore"
        },
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"
        ],
        amenities: ["WiFi", "Business Center", "Restaurant", "Gym", "Parking"],
        rating: 4.2,
        pricePerNight: 6000,
        currency: "INR",
        roomTypes: [
            {
                name: "Executive Room",
                description: "Business-friendly room with work desk",
                price: 6000,
                capacity: 2,
                available: 15
            },
            {
                name: "Conference Suite",
                description: "Large suite with meeting room",
                price: 18000,
                capacity: 8,
                available: 2
            }
        ],
        contact: {
            phone: "+91-80-12345678",
            email: "info@businesscenter.com",
            website: "https://businesscenter.com"
        },
        policies: {
            checkIn: "1:00 PM",
            checkOut: "10:00 AM",
            cancellation: "Free cancellation up to 12 hours before check-in",
            pets: false,
            smoking: true
        }
    }
];

async function addTestHotels() {
    try {
        // Clear existing hotels
        await Hotel.deleteMany({});
        console.log('Cleared existing hotels');

        // Add test hotels
        const addedHotels = await Hotel.insertMany(testHotels);
        console.log(`Added ${addedHotels.length} test hotels`);

        console.log('Test hotels added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding test hotels:', error);
        process.exit(1);
    }
}

addTestHotels(); 