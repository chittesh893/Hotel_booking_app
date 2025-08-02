import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useHotelForm, handleFormError } from '../lib/hooks/useFormValidation';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';

const AddHotelForm: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();
    const { token } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch
    } = useHotelForm();

    const photoFile = watch('photo');

    // Update preview when photo changes
    React.useEffect(() => {
        if (photoFile && photoFile[0]) {
            setPreview(URL.createObjectURL(photoFile[0]));
        }
    }, [photoFile]);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const onSubmit = async (data: { name: string; location: string; details: string; photo: FileList }) => {
        try {
            if (!data.photo || !data.photo[0]) {
                setError('photo', {
                    type: 'manual',
                    message: 'Please select a photo'
                });
                return;
            }

            // Convert photo to base64
            const photoBase64 = await convertToBase64(data.photo[0]);

            const hotelData = {
                name: data.name,
                location: data.location,
                details: data.details,
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
                handleFormError(setError, { response: { data: response.data } }, 'Failed to post hotel');
            }
        } catch (err: any) {
            console.error('Error posting hotel:', err);
            handleFormError(setError, err, 'Failed to post hotel');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Add a New Hotel</h2>

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
                    error={errors.photo}
                    required
                    {...register('photo')}
                />
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

                <FormButton
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    loadingText="Posting..."
                    className="w-full"
                    size="lg"
                >
                    Post Hotel
                </FormButton>
            </form>
        </div>
    );
};

export default AddHotelForm; 