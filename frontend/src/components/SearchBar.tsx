import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiFilter, FiX } from 'react-icons/fi';

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

interface SearchBarProps {
    onSearch: (filters: SearchFilters) => void;
    isLoading?: boolean;
    isIndex?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
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

    const availableAmenities = [
        'WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Parking',
        'Room Service', 'Air Conditioning', 'TV', 'Kitchen', 'Balcony'
    ];

    const sortOptions = [
        { value: 'createdAt', label: 'Latest' },
        { value: 'rating', label: 'Rating' },
        { value: 'name', label: 'Name' },
        { value: 'priceRange.max', label: 'Price' }
    ];

    const handleInputChange = (field: keyof SearchFilters, value: any) => {
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
    };

    const clearFilters = () => {
        setFilters({
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
    };

    const hasActiveFilters = filters.query || filters.city || filters.state ||
        filters.country || filters.minRating > 0 ||
        filters.maxPrice < 1000 || filters.amenities.length > 0;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Main Search Bar */}
            <form onSubmit={handleSearch} className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search Query */}
                    <div className="flex-1">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={filters.query}
                                onChange={(e) => handleInputChange('query', e.target.value)}
                                placeholder="Search hotels, destinations, or amenities..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex-1">
                        <div className="relative">
                            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={filters.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="City, State, or Country"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                        >
                            <FiFilter className="w-4 h-4" />
                            <span className="hidden sm:inline">Filters</span>
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 min-w-max"
                        >
                            <FiSearch className="w-4 h-4" />
                            <span>{isLoading ? 'Searching...' : 'Search'}</span>
                        </button>
                    </div>
                </div>
            </form>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Rating Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Rating
                            </label>
                            <select
                                value={filters.minRating}
                                onChange={(e) => handleInputChange('minRating', parseFloat(e.target.value))}
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
                                onChange={(e) => handleInputChange('maxPrice', parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* Sort Options */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order
                            </label>
                            <select
                                value={filters.sortOrder}
                                onChange={(e) => handleInputChange('sortOrder', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
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

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                                <FiX className="w-4 h-4" />
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 