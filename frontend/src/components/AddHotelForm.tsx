import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AddHotelForm: React.FC = () => {
    const [hotelName, setHotelName] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useAuth();

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
            if (!photo) {
                throw new Error('Please select a photo');
            }

            // Convert photo to base64
            const photoBase64 = await convertToBase64(photo);

            const hotelData = {
                name: hotelName,
                location: location,
                details: details,
                photo: photoBase64
            };

            const response = await axios.post('http://localhost:5000/api/hotels', hotelData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Hotel posted successfully!');
                navigate('/hotels');
            } else {
                setError(response.data.message || 'Failed to post hotel');
            }
        } catch (err: any) {
            console.error('Error posting hotel:', err);
            setError(err.response?.data?.message || err.message || 'Failed to post hotel');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Add a New Hotel</h2>

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
                        required
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
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

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                    {submitting ? 'Posting...' : 'Post Hotel'}
                </button>
            </form>
        </div>
    );
};

export default AddHotelForm; 