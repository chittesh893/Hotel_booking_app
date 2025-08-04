import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';
import { ArrowLeft, Upload, X } from 'lucide-react';
import axios from 'axios';
import { useToast } from './ToastContext';

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
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [uploadingImages, setUploadingImages] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        state: '',
        address: '',
        images: [] as string[],
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

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploadingImages(true);
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }

            const response = await axios.post('http://localhost:5000/api/upload/multiple', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                const newImageUrls = response.data.data.files.map((file: any) => file.url);
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...newImageUrls]
                }));
                toast.showSuccess(`${response.data.data.count} image(s) uploaded successfully!`);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Failed to upload images';
            toast.showError(errorMessage);
        } finally {
            setUploadingImages(false);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
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
            toast.showError('Failed to fetch hotel data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !hotelId) {
            toast.showError('Please log in to edit a hotel');
            return;
        }

        if (formData.images.length === 0) {
            toast.showError('At least one hotel image is required');
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
                toast.showSuccess('Hotel updated successfully!');
                navigate('/my-hotels');
            }
        } catch (error: any) {
            console.error('Error updating hotel:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update hotel';
            toast.showError(errorMessage);
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
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter hotel name"
                                    required
                                />
                                <FormInput
                                    label="Price per Night (INR)"
                                    name="pricePerNight"
                                    type="number"
                                    value={formData.pricePerNight}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('pricePerNight', parseInt(e.target.value))}
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
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
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
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('city', e.target.value)}
                                    placeholder="Enter city"
                                    required
                                />
                                <FormInput
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('state', e.target.value)}
                                    placeholder="Enter state"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <FormInput
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', e.target.value)}
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
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange('phone', e.target.value)}
                                    placeholder="+91-1234567890"
                                    required
                                />
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.contact.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange('email', e.target.value)}
                                    placeholder="info@hotel.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Hotel Images */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Images</h3>
                            <div className="space-y-4">
                                {/* Image Upload */}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={uploadingImages}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-col items-center space-y-2"
                                    >
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {uploadingImages ? 'Uploading...' : 'Click to upload images'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF, WEBP up to 5MB each
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Display Uploaded Images */}
                                {formData.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {formData.images.map((imageUrl, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={imageUrl}
                                                    alt={`Hotel image ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
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