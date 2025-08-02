import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEditHotelForm, handleFormError } from '../lib/hooks/useFormValidation';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';

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
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { hotelId } = useParams<{ hotelId: string }>();
    const { user, token } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        setValue,
        watch
    } = useEditHotelForm();

    const photoFile = watch('photo');

    // Update preview when photo changes
    useEffect(() => {
        if (photoFile && photoFile[0]) {
            setPreview(URL.createObjectURL(photoFile[0]));
        }
    }, [photoFile]);

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

                // Set form values
                setValue('name', hotelData.name);
                setValue('details', hotelData.description);
                setValue('location', `${hotelData.address.street}, ${hotelData.address.city}, ${hotelData.address.state}, ${hotelData.address.zipCode}, ${hotelData.address.country}`);

                if (hotelData.images && hotelData.images.length > 0) {
                    setPreview(hotelData.images[0]);
                }
            } else {
                handleFormError(setError, { response: { data: response.data } }, 'Failed to fetch hotel');
            }
        } catch (err: any) {
            console.error('Error fetching hotel:', err);
            handleFormError(setError, err, 'Failed to fetch hotel');
        } finally {
            setLoading(false);
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

    const onSubmit = async (data: { name: string; location: string; details: string; photo?: FileList }) => {
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
            if (data.photo && data.photo[0]) {
                photoBase64 = await convertToBase64(data.photo[0]);
            }

            const hotelData = {
                name: data.name,
                location: data.location,
                details: data.details,
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
                handleFormError(setError, { response: { data: response.data } }, 'Failed to update hotel');
            }
        } catch (err: any) {
            console.error('Error updating hotel:', err);
            handleFormError(setError, err, 'Failed to update hotel');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (errors.root && !hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">Error: {errors.root.message}</div>
                    <FormButton
                        onClick={() => navigate('/hotels')}
                        variant="primary"
                    >
                        Back to Hotels
                    </FormButton>
                </div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="text-center">
                    <div className="text-gray-600 text-xl mb-4">Hotel not found</div>
                    <FormButton
                        onClick={() => navigate('/hotels')}
                        variant="primary"
                    >
                        Back to Hotels
                    </FormButton>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Edit Hotel</h2>

                {errors.root && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        {errors.root.message}
                    </div>
                )}

                <FormInput
                    label="Hotel Photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    {...register('photo')}
                />
                <p className="text-sm text-gray-500 mt-1">Leave empty to keep current photo</p>
                {preview && (
                    <img src={preview} alt="Preview" className="mt-4 rounded-xl w-full h-48 object-cover border" />
                )}

                <FormInput
                    label="Hotel Name"
                    name="name"
                    type="text"
                    placeholder="Enter hotel name"
                    error={errors.name}
                    required
                    {...register('name')}
                />

                <FormInput
                    label="Location"
                    name="location"
                    type="text"
                    placeholder="Street, City, State, ZipCode, Country"
                    error={errors.location}
                    required
                    {...register('location')}
                />
                <p className="text-sm text-gray-500 mt-1">
                    Format: 123 Main St, New York, NY, 10001, USA
                </p>

                <FormInput
                    label="Details"
                    name="details"
                    type="textarea"
                    placeholder="Describe the hotel, amenities, etc."
                    error={errors.details}
                    rows={4}
                    required
                    {...register('details')}
                />

                <div className="flex space-x-4">
                    <FormButton
                        type="button"
                        onClick={() => navigate('/hotels')}
                        variant="secondary"
                        className="flex-1"
                        size="lg"
                    >
                        Cancel
                    </FormButton>
                    <FormButton
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        loadingText="Updating..."
                        className="flex-1"
                        size="lg"
                    >
                        Update Hotel
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default EditHotelForm; 