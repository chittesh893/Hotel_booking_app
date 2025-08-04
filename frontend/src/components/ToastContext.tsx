import React, { createContext, useContext, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ToastContextType {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showInfo: (message: string) => void;
    showWarning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const showSuccess = (message: string) => {
        toast.success(message, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#10B981',
                color: '#fff',
            },
        });
    };

    const showError = (message: string) => {
        toast.error(message, {
            duration: 5000,
            position: 'top-right',
            style: {
                background: '#EF4444',
                color: '#fff',
            },
        });
    };

    const showInfo = (message: string) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#3B82F6',
                color: '#fff',
            },
        });
    };

    const showWarning = (message: string) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#F59E0B',
                color: '#fff',
            },
        });
    };

    const value = {
        showSuccess,
        showError,
        showInfo,
        showWarning,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    );
}; 