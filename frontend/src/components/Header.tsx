import React, { useState } from 'react';
import { useAuth } from './AuthContext';

interface HeaderProps {
    onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-indigo-600">
                                HotelHub
                            </h1>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    placeholder="Search hotels, destinations..."
                                    className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-indigo-500 border-indigo-500' : ''
                                        }`}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <svg
                                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Navigation and User Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Navigation Links */}
                        <nav className="hidden md:flex space-x-8">
                            <a
                                href="#"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Hotels
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Destinations
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Deals
                            </a>
                        </nav>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md p-2 transition-colors duration-200"
                            >
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="hidden md:block text-sm font-medium">
                                    {user?.name}
                                </span>
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        My Bookings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Settings
                                    </a>
                                    <hr className="my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 