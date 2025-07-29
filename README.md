# HotelHub - Hotel Booking Application

A modern, responsive hotel booking application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🔍 Advanced Search & Filtering
- **Text Search**: Search hotels by name, description, or amenities
- **Location Filtering**: Filter by city, state, or country
- **Rating Filter**: Filter by minimum rating (1-5 stars)
- **Price Range**: Filter by maximum price
- **Amenities Filter**: Filter by available amenities (WiFi, Pool, Gym, etc.)
- **Sorting Options**: Sort by latest, rating, name, or price
- **Pagination**: Navigate through search results efficiently

### 🎨 Modern UI/UX
- **Clean Design**: Minimalist, modern interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Card-based Layout**: Beautiful hotel cards with images and details
- **Real-time Search**: Instant search results with loading indicators

### 🔐 Authentication & Security
- **JWT Authentication**: Secure login and registration
- **Protected Routes**: User-specific content and actions
- **Role-based Access**: Different permissions for users and admins

### 📱 User Experience
- **Sticky Navigation**: Always accessible header with user menu
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Graceful error boundaries and user-friendly messages
- **Mobile-First**: Optimized for mobile devices with touch-friendly interface

## 🚀 Getting Started

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

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthContext.tsx      # Authentication context
│   ├── Header.tsx           # Navigation header
│   ├── HotelFeed.tsx        # Main hotel listing with search
│   ├── SearchBar.tsx        # Advanced search component
│   ├── LoadingSpinner.tsx   # Reusable loading component
│   ├── ErrorBoundary.tsx    # Error handling component
│   └── ...                  # Other components
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## 🎯 Key Components

### SearchBar
- Advanced filtering with collapsible options
- Real-time search with debouncing
- Multiple filter types (text, location, rating, price, amenities)
- Sort and pagination controls

### HotelFeed
- Responsive grid layout
- Hotel cards with images, ratings, and details
- Owner-specific actions (edit/delete)
- Pagination for large result sets

### Header
- Sticky navigation with user menu
- Mobile-responsive design
- Active route highlighting

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Responsive**: Scales appropriately across devices

### Spacing
- **Consistent**: 4px base unit system
- **Responsive**: Adapts to screen size
- **Accessible**: Proper touch targets and spacing

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

- **ESLint** - Code linting and formatting
- **TypeScript** - Strict type checking
- **Prettier** - Code formatting (via ESLint)

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
