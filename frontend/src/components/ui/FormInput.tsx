import React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormInputProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    error?: FieldError;
    className?: string;
    required?: boolean;
    autoComplete?: string;
    rows?: number;
    accept?: string;
    [key: string]: any; // Allow any additional props
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    error,
    className = '',
    required = false,
    autoComplete,
    rows,
    accept,
    ...props
}) => {
    const baseInputClasses = "w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 bg-white text-gray-900 placeholder-gray-500";
    const errorClasses = error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400';
    const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`.trim();

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className={`${inputClasses} bg-white text-gray-900 placeholder-gray-500`}
                    rows={rows || 4}
                    autoComplete={autoComplete}
                    {...props}
                />
            ) : type === 'file' ? (
                <input
                    id={name}
                    name={name}
                    type={type}
                    accept={accept}
                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${error ? 'border-red-500' : ''}`}
                    {...props}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={inputClasses}
                    autoComplete={autoComplete}
                    {...props}
                />
            )}

            {error && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default FormInput; 