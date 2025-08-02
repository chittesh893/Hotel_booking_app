import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface Hotel {
    _id: string;
    name: string;
    description: string;
    location: {
        city: string;
        state: string;
        country: string;
        address: string;
    };
    images: string[];
    amenities: string[];
    rating: number;
    pricePerNight: number;
    currency: string;
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    policies: {
        checkIn: string;
        checkOut: string;
        cancellation: string;
        pets: boolean;
        smoking: boolean;
    };
    ownerId?: string;
}

const EditHotelForm: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { hotelId } = useParams<{ hotelId: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hotel, setHotel] = useState<Hotel | null>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        state: '',
        address: '',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
        amenities: [] as string[],
        rating: 4.0,
        pricePerNight: 5000,
        currency: 'INR',
        contact: {
            phone: '',
            email: '',
            website: ''
        },
        policies: {
            checkIn: '2:00 PM',
            checkOut: '11:00 AM',
            cancellation: 'Free cancellation up to 24 hours before check-in',
            pets: false,
            smoking: false
        }
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleContactChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value
            }
        }));
    };

    const handleAmenityToggle = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    // Fetch hotel data on component mount
    useEffect(() => {
        if (hotelId) {
            fetchHotel();
        }
    }, [hotelId]);

    const fetchHotel = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
            
            if (response.data.success) {
                const hotelData = response.data.data.hotel;
                setHotel(hotelData);

                // Pre-fill form with existing data
                setFormData({
                    name: hotelData.name || '',
                    description: hotelData.description || '',
                    city: hotelData.location?.city || '',
                    state: hotelData.location?.state || '',
                    address: hotelData.location?.address || '',
                    images: hotelData.images || ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
                    amenities: hotelData.amenities || [],
                    rating: hotelData.rating || 4.0,
                    pricePerNight: hotelData.pricePerNight || 5000,
                    currency: hotelData.currency || 'INR',
                    contact: {
                        phone: hotelData.contact?.phone || '',
                        email: hotelData.contact?.email || '',
                        website: hotelData.contact?.website || ''
                    },
                    policies: {
                        checkIn: hotelData.policies?.checkIn || '2:00 PM',
                        checkOut: hotelData.policies?.checkOut || '11:00 AM',
                        cancellation: hotelData.policies?.cancellation || 'Free cancellation up to 24 hours before check-in',
                        pets: hotelData.policies?.pets || false,
                        smoking: hotelData.policies?.smoking || false
                    }
                });
            }
        } catch (error: any) {
            console.error('Error fetching hotel:', error);
            alert('Failed to fetch hotel data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user || !hotelId) {
            alert('Please log in to edit a hotel');
            return;
        }

        setIsSubmitting(true);

        try {
            const hotelData = {
                ...formData,
                location: {
                    city: formData.city,
                    state: formData.state,
                    country: 'India',
                    address: formData.address
                },
                roomTypes: [{
                    name: 'Standard Room',
                    description: 'Comfortable room with basic amenities',
                    price: formData.pricePerNight,
                    capacity: 2,
                    available: 10
                }]
            };

            const response = await axios.put(`http://localhost:5000/api/hotels/${hotelId}`, hotelData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Hotel updated successfully!');
                navigate('/my-hotels');
            }
        } catch (error: any) {
            console.error('Error updating hotel:', error);
            alert(error.response?.data?.message || 'Failed to update hotel');
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableAmenities = ['WiFi', 'Parking', 'Restaurant', 'Pool', 'Gym', 'Spa'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-gray-600 text-xl mb-4">Hotel not found</div>
                    <button
                        onClick={() => navigate('/my-hotels')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to My Hotels
                    </button>
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
                            <button
                                onClick={() => navigate('/my-hotels')}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to My Hotels</span>
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Hotel</h1>
                        <div></div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput
                                    label="Hotel Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter hotel name"
                                    required
                                />
                                <FormInput
                                    label="Price per Night (INR)"
                                    name="pricePerNight"
                                    type="number"
                                    value={formData.pricePerNight}
                                    onChange={(e) => handleInputChange('pricePerNight', parseInt(e.target.value))}
                                    placeholder="5000"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <FormInput
                                    label="Description"
                                    name="description"
                                    type="textarea"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Describe your hotel..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    placeholder="Enter city"
                                    required
                                />
                                <FormInput
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    placeholder="Enter state"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <FormInput
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Enter full address"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.contact.phone}
                                    onChange={(e) => handleContactChange('phone', e.target.value)}
                                    placeholder="+91-1234567890"
                                    required
                                />
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.contact.email}
                                    onChange={(e) => handleContactChange('email', e.target.value)}
                                    placeholder="info@hotel.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {availableAmenities.map(amenity => (
                                    <label key={amenity} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => handleAmenityToggle(amenity)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate('/my-hotels')}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isSubmitting ? 'Updating Hotel...' : 'Update Hotel'}
                            </FormButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditHotelForm; 