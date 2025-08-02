import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AddHotelForm from './components/AddHotelForm';
import EditHotelForm from './components/EditHotelForm';
import HotelFeed from './components/HotelFeed';
import HotelDetails from './components/HotelDetails';
import Profile from './components/Profile';
import MyHotels from './components/MyHotels';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to hotels if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return user ? <Navigate to="/hotels" replace /> : <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupForm />
                </PublicRoute>
              }
            />
            
            <Route
              path="/hotels"
              element={
                <ProtectedRoute>
                  <HotelFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <ProtectedRoute>
                  <AddHotelForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <ProtectedRoute>
                  <EditHotelForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotels/:hotelId"
              element={<HotelDetails />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <ProtectedRoute>
                  <MyHotels />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;

