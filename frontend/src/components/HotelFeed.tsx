import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FiMapPin, FiStar, FiSearch, FiFilter, FiX } from 'react-icons/fi';

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
    priceRange: {
        min: number;
        max: number;
    };
    amenities: string[];
    createdAt: string;
}

interface SearchFilters {
    query: string;
    city: string;
    minRating: number;
    maxPrice: number;
    amenities: string[];
}

const HotelFeed: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [allHotels, setAllHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({
        query: '',
        city: '',
        minRating: 0,
        maxPrice: 1000,
        amenities: []
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const availableAmenities = [
        'WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Parking',
        'Room Service', 'Air Conditioning', 'TV', 'Kitchen', 'Balcony'
    ];

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/hotels');

            if (response.data.success) {
                setHotels(response.data.data);
                setAllHotels(response.data.data);
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        let filtered = [...allHotels];

        // Filter by search query
        if (filters.query.trim()) {
            filtered = filtered.filter(hotel =>
                hotel.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                hotel.address.city.toLowerCase().includes(filters.query.toLowerCase()) ||
                hotel.address.state.toLowerCase().includes(filters.query.toLowerCase())
            );
        }

        // Filter by city
        if (filters.city.trim()) {
            filtered = filtered.filter(hotel =>
                hotel.address.city.toLowerCase().includes(filters.city.toLowerCase())
            );
        }

        // Filter by rating
        if (filters.minRating > 0) {
            filtered = filtered.filter(hotel => hotel.rating >= filters.minRating);
        }

        // Filter by price
        if (filters.maxPrice < 1000) {
            filtered = filtered.filter(hotel =>
                hotel.priceRange && hotel.priceRange.max <= filters.maxPrice
            );
        }

        // Filter by amenities
        if (filters.amenities.length > 0) {
            filtered = filtered.filter(hotel =>
                hotel.amenities && filters.amenities.every(amenity =>
                    hotel.amenities.includes(amenity)
                )
            );
        }

        setHotels(filtered);
    };

    const handleFilterChange = (field: keyof SearchFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAmenityToggle = (amenity: string) => {
        setFilters(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const clearFilters = () => {
        setFilters({
            query: '',
            city: '',
            minRating: 0,
            maxPrice: 1000,
            amenities: []
        });
        setHotels(allHotels);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading hotels..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Blue Background */}
            <div className="bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center mb-2">HotelHub</h1>
                    <p className="text-center text-blue-100 text-lg">
                        Discover amazing hotels and find your perfect stay
                    </p>
                </div>
            </div>

            {/* Search with Filters */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={filters.query}
                                    onChange={(e) => handleFilterChange('query', e.target.value)}
                                    placeholder="Search hotels by name or location..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative">
                                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                    placeholder="City"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                            >
                                <FiFilter className="w-4 h-4" />
                                <span>Filters</span>
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="border-t border-gray-100 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Rating Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Rating
                                    </label>
                                    <select
                                        value={filters.minRating}
                                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value={0}>Any Rating</option>
                                        <option value={1}>1+ Stars</option>
                                        <option value={2}>2+ Stars</option>
                                        <option value={3}>3+ Stars</option>
                                        <option value={4}>4+ Stars</option>
                                        <option value={5}>5 Stars</option>
                                    </select>
                                </div>

                                {/* Price Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Price: ${filters.maxPrice}
                                    </label>
                                    <input
                                        type="range"
                                        min="50"
                                        max="1000"
                                        step="50"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                    >
                                        <FiX className="w-4 h-4" />
                                        Clear Filters
                                    </button>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Amenities
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                    {availableAmenities.map(amenity => (
                                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.amenities.includes(amenity)}
                                                onChange={() => handleAmenityToggle(amenity)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>


            {/* Hotel Feeds */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                {error ? (
                    <div className="text-center py-12">
                        <div className="text-red-600 text-xl mb-4">Error: {error}</div>
                        <button
                            onClick={fetchHotels}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Retry
                        </button>
                    </div>
                ) : hotels.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-xl mb-4">No hotels found</div>
                        <p className="text-gray-400">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel) => (
                            <div key={hotel._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                {/* Image */}
                                <div className="h-48 overflow-hidden">
                                    {hotel.images && hotel.images.length > 0 ? (
                                        <img
                                            src={hotel.images[0]}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {hotel.name}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <FiMapPin className="w-4 h-4 mr-1" />
                                        <span className="text-sm">
                                            {hotel.address.city}, {hotel.address.state}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {hotel.description}
                                    </p>

                                    {/* Rating and Price */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex items-center mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        className={`w-4 h-4 ${i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">{hotel.rating}/5</span>
                                        </div>

                                        {hotel.priceRange && (
                                            <div className="text-right">
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {formatPrice(hotel.priceRange.min)}
                                                </div>
                                                <div className="text-xs text-gray-500">per night</div>
                                            </div>
                                        )}
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