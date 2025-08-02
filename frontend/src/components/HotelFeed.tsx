import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Users, Calendar } from 'lucide-react';
import { Hotel } from '../lib/constants';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface HotelFeedProps {
    onHotelClick?: (hotel: Hotel) => void;
}

const HotelFeed: React.FC<HotelFeedProps> = ({ onHotelClick }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch hotels from API
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/hotels/search');
                setHotels(response.data.data);
                setFilteredHotels(response.data.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                // Fallback to sample data if API fails
                const fallbackHotels = [
                    {
                        _id: '1',
                        name: 'Grand Plaza Hotel',
                        description: 'Luxurious 5-star hotel in the heart of the city',
                        location: { city: 'Mumbai', state: 'Maharashtra' },
                        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
                        amenities: ['WiFi', 'Pool', 'Restaurant'],
                        rating: 4.5,
                        pricePerNight: 8000
                    },
                    {
                        _id: '2',
                        name: 'Seaside Resort',
                        description: 'Beautiful beachfront resort with stunning views',
                        location: { city: 'Goa', state: 'Goa' },
                        images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
                        amenities: ['WiFi', 'Pool', 'Beach Access'],
                        rating: 4.8,
                        pricePerNight: 12000
                    }
                ];
                setHotels(fallbackHotels);
                setFilteredHotels(fallbackHotels);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // Get unique cities from hotels
    const cities = hotels ? [...new Set(hotels.map(hotel => hotel.location?.city).filter(Boolean))] : [];

    // Filter hotels based on search criteria
    useEffect(() => {
        if (!hotels) return;

        let filtered = hotels.filter(hotel => {
            const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCity = selectedCity === '' || hotel.location?.city === selectedCity;

            const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1];

            const matchesAmenities = selectedAmenities.length === 0 ||
                selectedAmenities.some(amenity => hotel.amenities?.includes(amenity));

            return matchesSearch && matchesCity && matchesPrice && matchesAmenities;
        });

        setFilteredHotels(filtered);
    }, [hotels, searchTerm, selectedCity, priceRange, selectedAmenities]);

    const handleAmenityToggle = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCity('');
        setPriceRange([0, 50000]);
        setSelectedAmenities([]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Hotel Feed</h1>
                            <p className="text-gray-600 mt-1">
                                {user ? `Welcome back, ${user.name}!` : 'Discover amazing hotels'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Found {filteredHotels.length} hotels</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search hotels..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* City Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">All Cities</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range (₹)
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="50000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>₹{priceRange[0].toLocaleString()}</span>
                                        <span>₹{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amenities
                                </label>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {['Free WiFi', 'Swimming Pool', 'Restaurant', 'Spa & Wellness Center', 'Fitness Center', 'Free Parking'].map(amenity => (
                                        <label key={amenity} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedAmenities.includes(amenity)}
                                                onChange={() => handleAmenityToggle(amenity)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotels Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading hotels...</p>
                            </div>
                        ) : filteredHotels.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Search className="w-16 h-16 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredHotels.map((hotel, index) => (
                                    <div
                                        key={hotel._id || index}
                                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/hotels/${hotel._id}`)}
                                    >
                                        {/* Hotel Image */}
                                        <div className="relative h-48">
                                            <img
                                                src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
                                                alt={hotel.name || 'Hotel'}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="ml-1 text-sm font-medium">{hotel.rating || 0}</span>
                                            </div>
                                        </div>

                                        {/* Hotel Info */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                                                {hotel.name || 'Hotel Name'}
                                            </h3>
                                            <div className="flex items-center text-gray-500 mb-2">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span className="text-sm">{hotel.location?.city || 'City'}, {hotel.location?.state || 'State'}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {hotel.description || 'No description available'}
                                            </p>

                                            {/* Amenities */}
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {hotel.amenities?.slice(0, 3).map(amenity => (
                                                    <span
                                                        key={amenity}
                                                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                                    >
                                                        {amenity}
                                                    </span>
                                                )) || []}
                                                {hotel.amenities?.length > 3 && (
                                                    <span className="text-gray-500 text-xs">+{hotel.amenities.length - 3} more</span>
                                                )}
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        ₹{(hotel.pricePerNight || 0).toLocaleString()}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">/night</span>
                                                </div>
                                                <button
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/hotels/${hotel._id}`);
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelFeed; 