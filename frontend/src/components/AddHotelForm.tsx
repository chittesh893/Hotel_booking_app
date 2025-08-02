import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Hotel, HOTEL_AMENITIES, ROOM_TYPES } from '../lib/constants';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';
import { Plus, X, Upload } from 'lucide-react';

interface AddHotelFormProps {
    onSuccess?: (hotel: Hotel) => void;
    onCancel?: () => void;
}

const AddHotelForm: React.FC<AddHotelFormProps> = ({ onSuccess, onCancel }) => {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        state: '',
        country: 'India',
        address: '',
        images: [''],
        amenities: [] as string[],
        rating: 4.0,
        pricePerNight: 5000,
        currency: 'INR',
        roomTypes: [{
            name: 'Standard Room',
            description: '',
            price: 5000,
            capacity: 2,
            available: 10
        }],
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

    const handleLocationChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                [field]: value
            }
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

    const handlePolicyChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            policies: {
                ...prev.policies,
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

    const addRoomType = () => {
        setFormData(prev => ({
            ...prev,
            roomTypes: [...prev.roomTypes, {
                name: 'New Room Type',
                description: '',
                price: 5000,
                capacity: 2,
                available: 10
            }]
        }));
    };

    const updateRoomType = (index: number, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            roomTypes: prev.roomTypes.map((room, i) => 
                i === index ? { ...room, [field]: value } : room
            )
        }));
    };

    const removeRoomType = (index: number) => {
        setFormData(prev => ({
            ...prev,
            roomTypes: prev.roomTypes.filter((_, i) => i !== index)
        }));
    };

    const addImage = () => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, '']
        }));
    };

    const updateImage = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map((img, i) => i === index ? value : img)
        }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create hotel object
            const hotelData: Omit<Hotel, '_id' | 'createdAt' | 'updatedAt'> = {
                name: formData.name,
                description: formData.description,
                location: {
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    address: formData.address
                },
                images: formData.images.filter(img => img.trim() !== ''),
                amenities: formData.amenities,
                rating: formData.rating,
                pricePerNight: formData.pricePerNight,
                currency: formData.currency,
                roomTypes: formData.roomTypes,
                contact: formData.contact,
                policies: formData.policies,
                ownerId: user?._id
            };

            // Here you would typically make an API call to save the hotel
            // For now, we'll just simulate success
            console.log('Hotel data to save:', hotelData);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            onSuccess?.(hotelData as Hotel);
        } catch (error) {
            console.error('Error adding hotel:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Hotel</h2>
                            <button
                                onClick={onCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput
                                    label="Hotel Name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="Description"
                                    name="description"
                                    type="textarea"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormInput
                                    label="City"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => handleLocationChange('city', e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="State"
                                    name="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => handleLocationChange('state', e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="Country"
                                    name="country"
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => handleLocationChange('country', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <FormInput
                                    label="Full Address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleLocationChange('address', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                            <div className="space-y-3">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="url"
                                            placeholder="Image URL"
                                            value={image}
                                            onChange={(e) => updateImage(index, e.target.value)}
                                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {formData.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="px-3 py-2 text-red-600 hover:text-red-800"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addImage}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Image URL
                                </button>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormInput
                                    label="Price per Night (₹)"
                                    name="pricePerNight"
                                    type="number"
                                    value={formData.pricePerNight}
                                    onChange={(e) => handleInputChange('pricePerNight', parseInt(e.target.value))}
                                    required
                                />
                                <FormInput
                                    label="Rating"
                                    name="rating"
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                                    required
                                />
                                <FormInput
                                    label="Currency"
                                    name="currency"
                                    type="text"
                                    value={formData.currency}
                                    onChange={(e) => handleInputChange('currency', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {HOTEL_AMENITIES.slice(0, 20).map(amenity => (
                                    <label key={amenity} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => handleAmenityToggle(amenity)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Room Types */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Room Types</h3>
                                <button
                                    type="button"
                                    onClick={addRoomType}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Room Type
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.roomTypes.map((room, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-gray-900">Room Type {index + 1}</h4>
                                            {formData.roomTypes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeRoomType(index)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Room Type Name"
                                                value={room.name}
                                                onChange={(e) => updateRoomType(index, 'name', e.target.value)}
                                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={room.price}
                                                onChange={(e) => updateRoomType(index, 'price', parseInt(e.target.value))}
                                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Capacity"
                                                value={room.capacity}
                                                onChange={(e) => updateRoomType(index, 'capacity', parseInt(e.target.value))}
                                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Available Rooms"
                                                value={room.available}
                                                onChange={(e) => updateRoomType(index, 'available', parseInt(e.target.value))}
                                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <textarea
                                            placeholder="Room Description"
                                            value={room.description}
                                            onChange={(e) => updateRoomType(index, 'description', e.target.value)}
                                            className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormInput
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.contact.phone}
                                    onChange={(e) => handleContactChange('phone', e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.contact.email}
                                    onChange={(e) => handleContactChange('email', e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="Website (Optional)"
                                    name="website"
                                    type="url"
                                    value={formData.contact.website}
                                    onChange={(e) => handleContactChange('website', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Policies */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput
                                    label="Check-in Time"
                                    name="checkIn"
                                    type="text"
                                    value={formData.policies.checkIn}
                                    onChange={(e) => handlePolicyChange('checkIn', e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="Check-out Time"
                                    name="checkOut"
                                    type="text"
                                    value={formData.policies.checkOut}
                                    onChange={(e) => handlePolicyChange('checkOut', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <FormInput
                                    label="Cancellation Policy"
                                    name="cancellation"
                                    type="textarea"
                                    value={formData.policies.cancellation}
                                    onChange={(e) => handlePolicyChange('cancellation', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.policies.pets}
                                        onChange={(e) => handlePolicyChange('pets', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Pet Friendly</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.policies.smoking}
                                        onChange={(e) => handlePolicyChange('smoking', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Smoking Allowed</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                loadingText="Adding Hotel..."
                                className="px-6 py-2"
                            >
                                Add Hotel
                            </FormButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddHotelForm; 