import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Star,
    MapPin,
    ArrowLeft,
    Building,
    Calendar
} from 'lucide-react';
import axios from 'axios';

interface MyHotel {
    _id: string;
    name: string;
    description: string;
    location: {
        city: string;
        state: string;
        country: string;
        address: string;
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
    createdAt: string;
    updatedAt: string;
}

const MyHotels: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState<MyHotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        fetchMyHotels();
    }, []);

    const fetchMyHotels = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/hotels/my-hotels', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHotels(response.data.data.hotels);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to load your hotels');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHotel = async (hotelId: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHotels(hotels.filter(hotel => hotel._id !== hotelId));
            setDeleteConfirm(null);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete hotel');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your hotels</h2>
                    <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                        Go to Homepage
                    </Button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your hotels...</p>
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
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={() => navigate('/')}
                                variant="ghost"
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Home</span>
                            </Button>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">My Hotels</h1>
                        <Button
                            onClick={() => navigate('/add-hotel')}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Hotel</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {hotels.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                        <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels yet</h3>
                        <p className="text-gray-600 mb-6">Start by adding your first hotel to your portfolio.</p>
                        <Button
                            onClick={() => navigate('/add-hotel')}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Add Your First Hotel
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {hotels.map((hotel) => (
                            <div key={hotel._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                <div className="md:flex">
                                    {/* Hotel Image */}
                                    <div className="md:w-48 h-48 md:h-auto">
                                        {hotel.images.length > 0 ? (
                                            <img
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <Building className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Hotel Info */}
                                    <div className="flex-1 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span>{hotel.rating}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{hotel.location.city}, {hotel.location.state}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 line-clamp-2">{hotel.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {hotel.currency} {hotel.pricePerNight}
                                                </p>
                                                <p className="text-sm text-gray-500">per night</p>
                                            </div>
                                        </div>

                                        {/* Hotel Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Room Types</p>
                                                <p className="font-semibold">{hotel.roomTypes.length}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Amenities</p>
                                                <p className="font-semibold">{hotel.amenities.length}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Created</p>
                                                <p className="font-semibold">{formatDate(hotel.createdAt)}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                                                    variant="outline"
                                                    className="flex items-center space-x-1 px-4 py-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>View</span>
                                                </Button>
                                                <Button
                                                    onClick={() => navigate(`/edit-hotel/${hotel._id}`)}
                                                    variant="outline"
                                                    className="flex items-center space-x-1 px-4 py-2"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </Button>
                                                <Button
                                                    onClick={() => setDeleteConfirm(hotel._id)}
                                                    variant="outline"
                                                    className="flex items-center space-x-1 px-4 py-2 text-red-600 border-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </Button>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Last updated: {formatDate(hotel.updatedAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Confirmation */}
                                {deleteConfirm === hotel._id && (
                                    <div className="bg-red-50 border-t border-red-200 p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-red-700">
                                                Are you sure you want to delete "{hotel.name}"? This action cannot be undone.
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    variant="outline"
                                                    className="px-4 py-2"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteHotel(hotel._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyHotels; 