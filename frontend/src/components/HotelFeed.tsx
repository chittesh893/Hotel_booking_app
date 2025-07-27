import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Hotel {
    _id: string;
    name: string;
    description: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    images: string[];
    rating: number;
    createdAt: string;
}

const HotelFeed: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/hotels');
            if (response.data.success) {
                setHotels(response.data.data);
            } else {
                setError('Failed to fetch hotels');
            }
        } catch (err: any) {
            console.error('Error fetching hotels:', err);
            setError(err.response?.data?.message || 'Failed to fetch hotels');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">Error: {error}</div>
                    <button
                        onClick={fetchHotels}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotel Feed</h1>
                    <p className="text-lg text-gray-600">Discover amazing hotels posted by our community</p>
                </div>

                {hotels.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-xl mb-4">No hotels posted yet</div>
                        <p className="text-gray-400">Be the first to post a hotel!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotels.map((hotel) => (
                            <div key={hotel._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {hotel.images && hotel.images.length > 0 && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={hotel.images[0]}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>

                                    <div className="flex items-center text-gray-600 mb-3">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">
                                            {hotel.address.city}, {hotel.address.state}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {hotel.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="ml-2 text-sm text-gray-600">{hotel.rating}/5</span>
                                        </div>

                                        <span className="text-xs text-gray-400">
                                            {new Date(hotel.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelFeed; 