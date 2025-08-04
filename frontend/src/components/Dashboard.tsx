import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import HotelFeed from './HotelFeed';
import AddHotelForm from './AddHotelForm';
import { Hotel } from '../lib/constants';
import { Plus, X } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [showAddHotel, setShowAddHotel] = useState(false);
    const [hotels, setHotels] = useState<Hotel[]>([]);

    const handleHotelAdded = (newHotel: Hotel) => {
        setHotels(prev => [newHotel, ...prev]);
        setShowAddHotel(false);
    };

    const handleHotelClick = (hotel: Hotel) => {
        // Handle hotel click - could navigate to detail page
        console.log('Hotel clicked:', hotel.name);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Hotel Dashboard</h1>
                            <p className="text-gray-600 mt-1">
                                {user ? `Welcome back, ${user.name}!` : 'Discover amazing hotels'}
                            </p>
                        </div>
                        {user && (
                            <button
                                onClick={() => setShowAddHotel(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Hotel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            {showAddHotel ? (
                <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={() => setShowAddHotel(false)}
                            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    <AddHotelForm
                    //@ts-ignore
                        onSuccess={() => handleHotelAdded()}
                        onCancel={() => setShowAddHotel(false)}
                    />
                </div>
            ) : (
                <HotelFeed onHotelClick={handleHotelClick} />
            )}
        </div>
    );
};

export default Dashboard; 