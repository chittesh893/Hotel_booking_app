import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLoginForm, handleFormError } from '../lib/hooks/useFormValidation';
import FormInput from './ui/FormInput';
import FormButton from './ui/FormButton';

interface LoginFormProps {
    onSignupClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useLoginForm();

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            await login(data.email, data.password);
        } catch (err: any) {
            handleFormError(setError, err, 'Login failed');
        }
    };

    return (
        <div className="w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Welcome back to Hotel Booking
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <FormInput
                        name="email"
                        type="email"
                        placeholder="Email address"
                        error={errors.email}
                        autoComplete="email"
                        className="appearance-none rounded-none rounded-t-md"
                        {...register('email')}
                    />
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors.password}
                        autoComplete="current-password"
                        className="appearance-none rounded-none rounded-b-md"
                        {...register('password')}
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
                        loadingText="Signing in..."
                        className="w-full"
                        size="md"
                    >
                        Sign in
                    </FormButton>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={onSignupClick}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm; 