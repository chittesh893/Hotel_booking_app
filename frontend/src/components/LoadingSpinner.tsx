import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text = 'Loading...',
    className = '',
    variant = 'default'
}) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-10 w-10',
        lg: 'h-16 w-16',
        xl: 'h-20 w-20'
    };

 

    const variantClasses = {
        default: 'border-blue-500',
        primary: 'border-indigo-600',
        success: 'border-green-500',
        warning: 'border-yellow-500'
    };

    const textSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
    };

    return (
        <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
            <div className="relative">
                {/* Main spinner */}
                <div
                    className={`
                        ${sizeClasses[size]} 
                        animate-spin rounded-full 
                        border-4 border-gray-200 
                        ${variantClasses[variant]}
                        border-t-transparent
                        shadow-lg
                    `}
                ></div>

                {/* Pulsing background effect */}
                <div
                    className={`
                        absolute inset-0 
                        ${sizeClasses[size]} 
                        rounded-full 
                        bg-gradient-to-r from-transparent via-white/20 to-transparent
                        animate-pulse
                    `}
                ></div>
            </div>

            {text && (
                <div className="text-center">
                    <p className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}>
                        {text}
                    </p>
                    {/* Dots animation */}
                    <div className="flex justify-center space-x-1 mt-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadingSpinner; 
