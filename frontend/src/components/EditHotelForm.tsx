import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Hotel {
    _id: string;
    name: string;
    description: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    images: string[];
    userId?: {
        _id: string;
        name: string;
        email: string;
    };
}

const EditHotelForm: React.FC = () => {
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [hotelName, setHotelName] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { hotelId } = useParams<{ hotelId: string }>();
    const { user, token } = useAuth();

    useEffect(() => {
        if (hotelId) {
            fetchHotel();
        }
    }, [hotelId]);

    const fetchHotel = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
            if (response.data.success) {
                const hotelData = response.data.data;
                setHotel(hotelData);
                setHotelName(hotelData.name);
                setDetails(hotelData.description);
                setLocation(`${hotelData.address.street}, ${hotelData.address.city}, ${hotelData.address.state}, ${hotelData.address.zipCode}, ${hotelData.address.country}`);
                if (hotelData.images && hotelData.images.length > 0) {
                    setPreview(hotelData.images[0]);
                }
            } else {
                setError('Failed to fetch hotel');
            }
        } catch (err: any) {
            console.error('Error fetching hotel:', err);
            setError(err.response?.data?.message || 'Failed to fetch hotel');
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            if (!hotel) {
                throw new Error('Hotel not found');
            }

            // Check if user owns the hotel
            if (!hotel.userId) {
                throw new Error('This hotel was created before user ownership was implemented');
            }

            if (hotel.userId._id !== user?.id) {
                throw new Error('You can only edit hotels you created');
            }

            let photoBase64 = hotel.images[0]; // Use existing photo if no new one selected
            if (photo) {
                photoBase64 = await convertToBase64(photo);
            }

            const hotelData = {
                name: hotelName,
                location: location,
                details: details,
                photo: photoBase64
            };

            const response = await axios.put(`http://localhost:5000/api/hotels/${hotelId}`, hotelData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Hotel updated successfully!');
                navigate('/hotels');
            } else {
                setError(response.data.message || 'Failed to update hotel');
            }
        } catch (err: any) {
            console.error('Error updating hotel:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update hotel');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error && !hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">Error: {error}</div>
                    <button
                        onClick={() => navigate('/hotels')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Back to Hotels
                    </button>
                </div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="text-center">
                    <div className="text-gray-600 text-xl mb-4">Hotel not found</div>
                    <button
                        onClick={() => navigate('/hotels')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Back to Hotels
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Edit Hotel</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Hotel Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">Leave empty to keep current photo</p>
                    {preview && (
                        <img src={preview} alt="Preview" className="mt-4 rounded-xl w-full h-48 object-cover border" />
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Hotel Name</label>
                    <input
                        type="text"
                        value={hotelName}
                        onChange={e => setHotelName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter hotel name"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Street, City, State, ZipCode, Country"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Format: 123 Main St, New York, NY, 10001, USA
                    </p>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Details</label>
                    <textarea
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Describe the hotel, amenities, etc."
                        rows={4}
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/hotels')}
                        className="flex-1 py-3 rounded-xl bg-gray-500 text-white font-bold text-lg hover:bg-gray-600 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                    >
                        {submitting ? 'Updating...' : 'Update Hotel'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditHotelForm; 