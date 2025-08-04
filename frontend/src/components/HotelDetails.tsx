import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
    ArrowLeft,
    Star,
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Users,
    Wifi,
    Car,
    Coffee,
    Dumbbell,
    Waves,
    Utensils,
    CheckCircle,
    XCircle
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface HotelDetails {
    _id: string;
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
    ownerId?: string;
    createdAt?: string;
    updatedAt?: string;
}

const HotelDetails: React.FC = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const toast = useToast();
    const [hotel, setHotel] = useState<HotelDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
                setHotel(response.data.data.hotel);
            } catch (err: any) {
                const errorMessage = err.response?.data?.error || 'Failed to load hotel details';
                setError(errorMessage);
                toast.showError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (hotelId) {
            fetchHotelDetails();
        }
    }, [hotelId, toast]);

    const getAmenityIcon = (amenity: string) => {
        const amenityIcons: { [key: string]: React.ReactNode } = {
            'WiFi': <Wifi className="w-5 h-5" />,
            'Parking': <Car className="w-5 h-5" />,
            'Restaurant': <Utensils className="w-5 h-5" />,
            'Pool': <Waves className="w-5 h-5" />,
            'Gym': <Dumbbell className="w-5 h-5" />,
            'Coffee Shop': <Coffee className="w-5 h-5" />,
        };
        return amenityIcons[amenity] || <CheckCircle className="w-5 h-5" />;
    };

    const handleBookNow = (roomType: any) => {
        if (!user) {
            toast.showWarning('Please sign in to book a room');
            navigate('/login');
            return;
        }

        // Here you would implement the actual booking logic
        toast.showInfo('Booking feature coming soon!');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading hotel details...</p>
                </div>
            </div>
        );
    }

    if (error || !hotel) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || 'The hotel you are looking for does not exist.'}</p>
                    <Button onClick={() => navigate('/hotels')} className="bg-blue-600 hover:bg-blue-700">
                        Back to Hotels
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={() => navigate('/hotels')}
                            variant="ghost"
                            className="flex items-center space-x-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Hotels</span>
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
                        <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{hotel.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Image Gallery */}
                <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
                    <div className="relative h-96">
                        {hotel.images.length > 0 ? (
                            <>
                                <img
                                    src={hotel.images[currentImageIndex]}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover"
                                />
                                {hotel.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {hotel.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-500">No images available</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hotel Info */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{hotel.name}</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-semibold">{hotel.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{hotel.location.city}, {hotel.location.state}</span>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
                        </div>

                        {/* Room Types */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Available Rooms</h3>
                            <div className="space-y-4">
                                {hotel.roomTypes.map((room, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{room.name}</h4>
                                                <p className="text-gray-600 text-sm">{room.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg text-blue-600">
                                                    {hotel.currency} {room.price}
                                                </p>
                                                <p className="text-sm text-gray-500">per night</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center space-x-1">
                                                    <Users className="w-4 h-4" />
                                                    <span>Up to {room.capacity} guests</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span>{room.available} available</span>
                                                </span>
                                            </div>
                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => handleBookNow(room)}
                                            >
                                                Book Now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {hotel.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="text-blue-600">
                                            {getAmenityIcon(amenity)}
                                        </div>
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700">{hotel.contact.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700">{hotel.contact.email}</span>
                                </div>
                                {hotel.contact.website && (
                                    <div className="flex items-center space-x-3">
                                        <Globe className="w-5 h-5 text-gray-500" />
                                        <a
                                            href={hotel.contact.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hotel Policies */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Hotel Policies</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Check-in: {hotel.policies.checkIn}</p>
                                        <p className="text-sm text-gray-600">Check-out: {hotel.policies.checkOut}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {hotel.policies.pets ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span className="text-gray-700">
                                        {hotel.policies.pets ? 'Pets allowed' : 'No pets allowed'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {hotel.policies.smoking ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span className="text-gray-700">
                                        {hotel.policies.smoking ? 'Smoking allowed' : 'No smoking'}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p className="font-medium mb-1">Cancellation Policy:</p>
                                    <p>{hotel.policies.cancellation}</p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                            <div className="space-y-2">
                                <p className="text-gray-700">{hotel.location.address}</p>
                                <p className="text-gray-700">{hotel.location.city}, {hotel.location.state}</p>
                                <p className="text-gray-700">{hotel.location.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails; 