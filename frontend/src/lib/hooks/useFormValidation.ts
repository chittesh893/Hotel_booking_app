import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Common validation schemas
export const loginSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
}).required();

export const signupSchema = yup.object({
    name: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    phone: yup.string().required('Phone number is required').matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
}).required();

export const hotelSchema = yup.object({
    name: yup.string().required('Hotel name is required').min(2, 'Hotel name must be at least 2 characters'),
    location: yup.string().required('Location is required').min(5, 'Please provide a complete location'),
    details: yup.string().required('Details are required').min(10, 'Please provide more details about the hotel'),
    photo: yup.mixed().required('Please select a photo')
}).required();

export const editHotelSchema = yup.object({
    name: yup.string().required('Hotel name is required').min(2, 'Hotel name must be at least 2 characters'),
    location: yup.string().required('Location is required').min(5, 'Please provide a complete location'),
    details: yup.string().required('Details are required').min(10, 'Please provide more details about the hotel'),
    photo: yup.mixed().optional()
}).required();

// Type definitions
export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

export interface HotelFormData {
    name: string;
    location: string;
    details: string;
    photo: FileList;
}

export interface EditHotelFormData {
    name: string;
    location: string;
    details: string;
    photo?: FileList;
}

// Custom hooks for different form types
export const useLoginForm = (): UseFormReturn<LoginFormData> => {
    return useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur'
    });
};

export const useSignupForm = (): UseFormReturn<SignupFormData> => {
    return useForm<SignupFormData>({
        resolver: yupResolver(signupSchema),
        mode: 'onBlur'
    });
};

export const useHotelForm = (): UseFormReturn<HotelFormData> => {
    //@ts-ignore
    return useForm<HotelFormData>({
        //@ts-ignore
        resolver: yupResolver(hotelSchema),
        mode: 'onBlur'
    });
};

export const useEditHotelForm = (): UseFormReturn<EditHotelFormData> => {
    //@ts-ignore
    return useForm<EditHotelFormData>({
        //@ts-ignore
        resolver: yupResolver(editHotelSchema),
        mode: 'onBlur'
    });
};

// Utility function to handle form errors
export const handleFormError = (
    setError: any,
    error: any,
    defaultMessage: string = 'An error occurred'
) => {
    setError('root', {
        type: 'manual',
        message: error.response?.data?.message || error.message || defaultMessage
    });
}; 