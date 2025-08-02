import React from 'react';
import { FieldError } from 'react-hook-form';

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
    children?: React.ReactNode;
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
    children
}) => {
    const baseInputClasses = "w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200";
    const errorClasses = error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400';
    const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

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
                    className={inputClasses}
                    rows={rows || 4}
                    autoComplete={autoComplete}
                    {...children}
                />
            ) : type === 'file' ? (
                <input
                    id={name}
                    name={name}
                    type={type}
                    accept={accept}
                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${error ? 'border-red-500' : ''}`}
                    {...children}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={inputClasses}
                    autoComplete={autoComplete}
                    {...children}
                />
            )}

            {error && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default FormInput; 