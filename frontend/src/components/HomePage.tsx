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
import { LoadingSpinner } from './LoadingSpinner'

export default function HomePage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('hotels')

    return (
        <div className="min-h-screen bg-gray-900">
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

                        <Dialog.Root open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                            <Dialog.Trigger asChild>
                                <Button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                                    <span>Login or Create Account</span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px]">
                                    <LoginForm onSignupClick={() => {
                                        setIsLoginModalOpen(false)
                                        setIsSignupModalOpen(true)
                                    }} />
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>

                        <Dialog.Root open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px]">
                                    <SignupForm onLoginClick={() => {
                                        setIsSignupModalOpen(false)
                                        setIsLoginModalOpen(true)
                                    }} />
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
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

                    {/* Luxury Sections */}
                    <div className="mb-16">
                        <div className="grid grid-cols-4 gap-8">
                            {/* Intro Section */}
                            <div className="text-white">
                                <h2 className="text-sm text-gray-300 mb-2">INTRODUCING</h2>
                                <h3 className="text-4xl font-bold text-yellow-400 mb-2">Luxe</h3>
                                <h3 className="text-4xl font-bold text-yellow-400">Selections</h3>
                            </div>

                            {/* Luxe Properties in India */}
                            <div className="group relative rounded-lg overflow-hidden cursor-pointer">
                                <img
                                    src="https://promos.makemytrip.com/Hotels_product/Luxe/brands.png"
                                    alt="Luxury Palace"
                                    className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-xl font-bold mb-1">Luxe properties in India</h4>
                                    <p className="text-sm">Explore by Luxury brands, themes & top picks</p>
                                </div>
                            </div>

                            {/* Luxe Villas */}
                            <div className="group relative rounded-lg overflow-hidden cursor-pointer">
                                <img
                                    src="https://promos.makemytrip.com/altacco_luxe/imgs/luxe_villa.jpg"
                                    alt="Luxury Villa"
                                    className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-xl font-bold mb-1">Luxe Villas</h4>
                                    <p className="text-sm">Premium Villas with Superlative Experience</p>
                                </div>
                            </div>

                            {/* Luxe International */}
                            <div className="group relative rounded-lg overflow-hidden cursor-pointer">
                                <img
                                    src="https://promos.makemytrip.com/notification/xhdpi/maldives.jpg"
                                    alt="International Luxury Resort"
                                    className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-xl font-bold mb-1">Luxe International</h4>
                                    <p className="text-sm">Dubai, Maldives, Thailand & More</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flagship Hotel Stores */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8">Flagship Hotel Stores on HotelBooking</h2>
                        <div className="grid grid-cols-2 gap-8">
                            {/* Timbertales */}
                            <div className="group relative rounded-lg overflow-hidden cursor-pointer">
                                <img
                                    src="https://platforms.makemytrip.com/contents/f8efe442-684a-4331-86d9-edc1a165d0c6"
                                    alt="Timbertales Luxury Resort"
                                    className="w-full h-80 object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-2xl font-bold mb-1">Timbertales Luxury Resort</h4>
                                    <p className="text-sm">Experience luxury in the heart of nature</p>
                                </div>
                            </div>

                            {/* Best Western */}
                            <div className="group relative rounded-lg overflow-hidden cursor-pointer">
                                <img
                                    src="https://platforms.makemytrip.com/contents/227f8737-13e4-4e43-95ad-872b488a55cd"
                                    alt="Best Western Hotels"
                                    className="w-full h-80 object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-2xl font-bold mb-1">Best Western Hotels & Resorts</h4>
                                    <p className="text-sm">Discover comfort and luxury worldwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}