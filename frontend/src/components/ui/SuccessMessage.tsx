import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
    message: string;
    className?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, className = '' }) => {
    return (
        <div className={`rounded-md bg-green-50 p-4 border border-green-200 ${className}`}>
            <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <div className="text-sm text-green-700">{message}</div>
            </div>
        </div>
    );
};

export default SuccessMessage; 