import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { User, Mail, Phone, LogOut, ArrowLeft } from 'lucide-react';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
                    <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                        Go to Homepage
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
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
                        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="bg-blue-100 rounded-full p-4">
                            <User className="w-12 h-12 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>

                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium text-gray-900">{user.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Details</h3>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Account Type</p>
                                <p className="font-medium text-gray-900 capitalize">{user.role}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">User ID</p>
                                <p className="font-medium text-gray-900 font-mono text-sm">{user.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="border-t pt-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                                 <div className="grid md:grid-cols-2 gap-4">
                             <Button
                                 onClick={() => navigate('/my-hotels')}
                                 className="bg-green-600 hover:bg-green-700 text-white"
                             >
                                 My Hotels
                             </Button>
                             <Button
                                 onClick={() => navigate('/add-hotel')}
                                 className="bg-purple-600 hover:bg-purple-700 text-white"
                             >
                                 Add New Hotel
                             </Button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 