import React from 'react';
import { useAuth } from './AuthContext';
import { useSignupForm, handleFormError } from '../lib/hooks/useFormValidation';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';

interface SignupFormProps {
    onLoginClick?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onLoginClick }) => {
    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useSignupForm();

    const onSubmit = async (data: { name: string; email: string; password: string; phone: string }) => {
        try {
            await registerUser(data.name, data.email, data.password, data.phone);
        } catch (err: any) {
            handleFormError(setError, err, 'Registration failed');
        }
    };

    return (
        <div className="w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join Hotel Booking today
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormInput
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        error={errors.name}
                        autoComplete="name"
                        required
                        {...register('name')}
                    />
                    <FormInput
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        error={errors.email}
                        autoComplete="email"
                        required
                        {...register('email')}
                    />
                    <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        error={errors.phone}
                        autoComplete="tel"
                        required
                        {...register('phone')}
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password}
                        autoComplete="new-password"
                        required
                        {...register('password')}
                    />
                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        error={errors.confirmPassword}
                        autoComplete="new-password"
                        required
                        {...register('confirmPassword')}
                    />
                </div>

                {errors.root && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="text-sm text-red-700">{errors.root.message}</div>
                    </div>
                )}

                <div>
                    <FormButton
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        loadingText="Creating account..."
                        className="w-full"
                        size="md"
                    >
                        Create account
                    </FormButton>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignupForm; 