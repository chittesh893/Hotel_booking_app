import { useState } from 'react'
import { Button } from "./ui/button"
import {
    Calendar,
    ChevronDown,
    MapPin,
    Users,
    Plane,
    Building,
    Home,
    FileText,
    Car
} from "lucide-react"
import * as Dialog from '@radix-ui/react-dialog'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import SuccessMessage from './ui/SuccessMessage'
import HotelFeed from './HotelFeed'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function HomePage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('hotels')
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleAuthSuccess = (message: string) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(false);

        // Hide success message after 5 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-sm text-green-700">{successMessage}</div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <Button
                                    onClick={() => navigate('/my-hotels')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                >
                                    View My Hotels
                                </Button>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="text-green-400 hover:text-green-600"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Header section remains the same */}
            <header className="bg-gray-800 px-4 py-3">
                {/* ... header content remains the same ... */}
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-white font-bold text-xl">
                            Hotel<span className="bg-red-500 text-white px-1 rounded">BOOK</span>ing
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-2 text-white">
                                    <span>Welcome, {user.name}!</span>
                                </div>
                                <Button
                                    onClick={() => navigate('/my-hotels')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                >
                                    My Hotels
                                </Button>
                                <Button
                                    onClick={() => navigate('/profile')}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                                >
                                    Profile
                                </Button>
                                <Button
                                    onClick={() => {
                                        logout();
                                        setShowSuccess(false);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center space-x-2 text-white">
                                    <Home className="w-4 h-4" />
                                    <span>List Your Property</span>
                                    <span className="text-gray-400">Grow your business</span>
                                </div>

                                <div className="flex items-center space-x-2 text-white">
                                    <FileText className="w-4 h-4" />
                                    <span>My Trips</span>
                                    <span className="text-gray-400">Manage your bookings</span>
                                </div>
                            </>
                        )}

                        {!user && (
                            <Dialog.Root open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} modal={true}>
                                <Dialog.Trigger asChild>
                                    <Button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                                        <span>Login or Create Account</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 w-[450px] max-w-[90vw] max-h-[90vh] overflow-y-auto z-50 border border-gray-200">
                                        <div className="absolute top-4 right-4">
                                            <Dialog.Close asChild>
                                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </Dialog.Close>
                                        </div>
                                        <LoginForm
                                            onSignupClick={() => {
                                                setIsLoginModalOpen(false)
                                                setIsSignupModalOpen(true)
                                            }}
                                            onSuccess={() => handleAuthSuccess('Login successful! Welcome back!')}
                                        />
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        )}

                        {!user && (
                            <Dialog.Root open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen} modal={true}>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 w-[450px] max-w-[90vw] max-h-[90vh] overflow-y-auto z-50 border border-gray-200">
                                        <div className="absolute top-4 right-4">
                                            <Dialog.Close asChild>
                                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </Dialog.Close>
                                        </div>
                                        <SignupForm
                                            onLoginClick={() => {
                                                setIsSignupModalOpen(false)
                                                setIsLoginModalOpen(true)
                                            }}
                                            onSuccess={() => handleAuthSuccess('Account created successfully! Welcome to HotelBooking!')}
                                        />
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative min-h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700">
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16">
                    {/* Search Widget section remains the same */}
                    <div className="bg-white rounded-lg shadow-2xl p-6 mb-16">
                        {/* ... search widget content remains the same ... */}
                        {/* Service Tabs */}
                        <div className="flex items-center space-x-8 mb-6 border-b">
                            <button
                                onClick={() => setActiveTab('flights')}
                                className={`flex items-center space-x-2 pb-3 ${activeTab === 'flights'
                                    ? 'border-b-2 border-blue-500 text-blue-500'
                                    : 'text-gray-600'
                                    }`}
                            >
                                <Plane className="w-5 h-5" />
                                <span>Flights</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('hotels')}
                                className={`flex items-center space-x-2 pb-3 ${activeTab === 'hotels'
                                    ? 'border-b-2 border-blue-500 text-blue-500'
                                    : 'text-gray-600'
                                    }`}
                            >
                                <Building className="w-5 h-5" />
                                <span>Hotels</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('cabs')}
                                className={`flex items-center space-x-2 pb-3 ${activeTab === 'cabs'
                                    ? 'border-b-2 border-blue-500 text-blue-500'
                                    : 'text-gray-600'
                                    }`}
                            >
                                <Car className="w-5 h-5" />
                                <span>Cabs</span>
                            </button>
                        </div>

                        {/* Search Forms */}
                        {activeTab === 'hotels' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-4 gap-4">
                                    {/* Location */}
                                    <div className="relative">
                                        <label className="block text-sm text-gray-600 mb-1">City, Property Name Or Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Where are you going?"
                                                className="pl-10 pr-3 py-2 w-full border rounded-md"
                                            />
                                        </div>
                                    </div>

                                    {/* Check-In */}
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Check-In</label>
                                        <div className="flex items-center space-x-1 p-2 border rounded-md">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                className="w-full outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Check-Out */}
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Check-Out</label>
                                        <div className="flex items-center space-x-1 p-2 border rounded-md">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                className="w-full outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Rooms & Guests */}
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Rooms & Guests</label>
                                        <div className="flex items-center space-x-1 p-2 border rounded-md">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <select className="w-full outline-none">
                                                <option>1 Room, 2 Adults</option>
                                                <option>1 Room, 1 Adult</option>
                                                <option>2 Rooms, 4 Adults</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="text-center">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 text-lg font-semibold rounded-full">
                                        SEARCH
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'flights' && (
                            <div className="text-center py-8 text-gray-500">
                                Flight booking coming soon!
                            </div>
                        )}

                        {activeTab === 'cabs' && (
                            <div className="text-center py-8 text-gray-500">
                                Cab booking coming soon!
                            </div>
                        )}
                    </div>

                    {/* Hotel Feed Section - Right after search */}
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-4">Discover Amazing Hotels</h2>
                            <p className="text-xl text-gray-300">Find your perfect stay with our curated collection</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <HotelFeed />
                        </div>
                    </div>

                    {/* Welcome Section */}
                    <div className="mb-16 text-center">
                        <div className="text-white">
                            <h2 className="text-4xl font-bold mb-4">Welcome to HotelBooking</h2>
                            <p className="text-xl text-gray-300 mb-8">Find your perfect stay with our extensive collection of hotels worldwide</p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-400 mb-2">1000+</div>
                                    <div className="text-gray-300">Hotels Worldwide</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                                    <div className="text-gray-300">Countries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                                    <div className="text-gray-300">Customer Support</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Choose HotelBooking?</h2>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center text-white">
                                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <Building className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                                <p className="text-gray-300">Get the best deals and discounts on hotel bookings</p>
                            </div>
                            <div className="text-center text-white">
                                <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                                <p className="text-gray-300">Simple and secure booking process with instant confirmation</p>
                            </div>
                            <div className="text-center text-white">
                                <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                                <p className="text-gray-300">Round the clock customer support for all your needs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}