import React from 'react';

interface FormButtonProps {
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({
    type = 'button',
    disabled = false,
    loading = false,
    loadingText,
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick
}) => {
    const baseClasses = "font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl";

    const variantClasses = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const displayText = loading && loadingText ? loadingText : children;
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={buttonClasses}
            onClick={onClick}
        >
            {displayText}
        </button>
    );
};

export default FormButton; 