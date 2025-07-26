# Hotel Booking Frontend

This is the frontend application for the Hotel Booking system with JWT authentication.

## Features

- User registration and login with JWT tokens
- Protected routes with authentication
- Modern UI with Tailwind CSS
- Responsive design
- Form validation

## Getting Started

### Prerequisites

Make sure you have the backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Routes

- `/` - Redirects to login
- `/login` - Login page
- `/signup` - Registration page
- `/dashboard` - Protected dashboard (requires authentication)

## Testing the Authentication

1. Start both backend and frontend servers
2. Navigate to `/signup` to create a new account
3. After successful registration, you'll be redirected to the dashboard
4. Try accessing `/dashboard` directly - you should stay logged in
5. Click logout to test the logout functionality
6. Try accessing `/dashboard` again - you should be redirected to login

## Backend API Endpoints

The frontend connects to these backend endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

## Technologies Used

- React 19
- TypeScript
- React Router DOM
- Axios for API calls
- Tailwind CSS for styling
- JWT for authentication
