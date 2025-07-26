import React from 'react';
import { useAuth } from './AuthContext';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Hotel Booking Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                User Information
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user?.phone}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                                    Browse Hotels
                                </button>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                                    My Bookings
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                                    Profile Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard; 