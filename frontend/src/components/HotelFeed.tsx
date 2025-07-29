import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import { FiMapPin, FiStar, FiEdit, FiTrash2, FiHeart, FiShare2, FiFilter } from 'react-icons/fi';

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
    userId?: {
        _id: string;
        name: string;
        email: string;
    };
}

interface SearchFilters {
    query: string;
    city: string;
    state: string;
    country: string;
    minRating: number;
    maxPrice: number;
    amenities: string[];
    sortBy: string;
    sortOrder: string;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalHotels: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const HotelFeed: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
        query: '',
        city: '',
        state: '',
        country: '',
        minRating: 0,
        maxPrice: 1000,
        amenities: [],
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });
    const [showFilters, setShowFilters] = useState(false);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async (filters?: SearchFilters, page: number = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
                        if (Array.isArray(value)) {
                            params.append(key, value.join(','));
                        } else {
                            params.append(key, value.toString());
                        }
                    }
                });
            }

            params.append('page', page.toString());
            params.append('limit', '12');

            const response = await axios.get(`http://localhost:5000/api/hotels/search?${params}`);

            if (response.data.success) {
                setHotels(response.data.data);
                setPagination(response.data.pagination);
                setCurrentFilters(filters || currentFilters);
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

    const handleSearch = async (filters: SearchFilters) => {
        setSearchLoading(true);
        await fetchHotels(filters, 1);
        setSearchLoading(false);
    };

    const handlePageChange = (page: number) => {
        fetchHotels(currentFilters, page);
    };

    const handleEdit = (hotelId: string) => {
        navigate(`/edit-hotel/${hotelId}`);
    };

    const handleDelete = async (hotelId: string) => {
        if (!window.confirm('Are you sure you want to delete this hotel?')) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                alert('Hotel deleted successfully!');
                fetchHotels(currentFilters, pagination?.currentPage || 1);
            } else {
                alert(response.data.message || 'Failed to delete hotel');
            }
        } catch (err: any) {
            console.error('Error deleting hotel:', err);
            alert(err.response?.data?.message || 'Failed to delete hotel');
        }
    };

    const isOwner = (hotel: Hotel) => {
        return user && hotel.userId && hotel.userId._id === user.id;
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
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                    <LoadingSpinner size="lg" text="Loading hotels..." />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Discover Hotels</h1>
                            <p className="text-gray-600 mt-1">
                                {pagination ? `${pagination.totalHotels} hotels found` : 'Find your perfect stay'}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FiFilter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                            {user && (
                                <button
                                    onClick={() => navigate('/add-hotel')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Add Hotel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <SearchBar onSearch={handleSearch} isLoading={searchLoading} />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                {error ? (
                    <div className="text-center py-12">
                        <div className="text-red-600 text-xl mb-4">Error: {error}</div>
                        <button
                            onClick={() => fetchHotels()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Retry
                        </button>
                    </div>
                ) : hotels.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-xl mb-4">No hotels found</div>
                        <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
                        {user && (
                            <button
                                onClick={() => navigate('/add-hotel')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Add First Hotel
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Hotels Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {hotels.map((hotel) => (
                                <div key={hotel._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {hotel.images && hotel.images.length > 0 ? (
                                            <img
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">No image</span>
                                            </div>
                                        )}

                                        {/* Action buttons */}
                                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                                                <FiHeart className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                                                <FiShare2 className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>

                                        {/* Owner actions */}
                                        {isOwner(hotel) && (
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(hotel._id)}
                                                    className="w-8 h-8 bg-blue-600 rounded-full shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                                                >
                                                    <FiEdit className="w-4 h-4 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(hotel._id)}
                                                    className="w-8 h-8 bg-red-600 rounded-full shadow-md flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                                                >
                                                    <FiTrash2 className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                                {hotel.name}
                                            </h3>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center text-gray-600 mb-3">
                                            <FiMapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                            <span className="text-sm line-clamp-1">
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

                                        {/* Amenities */}
                                        {hotel.amenities && hotel.amenities.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <div className="flex flex-wrap gap-1">
                                                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                        >
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                    {hotel.amenities.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            +{hotel.amenities.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                            const page = i + 1;
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${page === pagination.currentPage
                                                        ? 'bg-blue-600 text-white'
                                                        : 'border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={!pagination.hasNextPage}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HotelFeed; 