# Hotel Booking Application

A full-stack hotel booking application built with React (Frontend) and Node.js/Express (Backend) with MongoDB database.

## 🚀 Features

- **User Authentication**: Sign up, login, and profile management
- **Hotel Management**: Add, edit, and manage hotels
- **Search & Filter**: Find hotels by location, amenities, and price
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Live hotel availability and booking status

## 🛠️ Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- React Hook Form for form handling
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd hotel-booking-application
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all
```

### 3. Environment Setup

Create a `config.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

### 4. Database Setup

Make sure MongoDB is running locally or use a cloud MongoDB instance.

### 5. Seed the Database (Optional)
```bash
cd backend
npm run seed:hotels
```

### 6. Run the Application

#### Development Mode (Separate Frontend & Backend)
```bash
# Run both frontend and backend concurrently
npm run dev
```

This will start:
- Backend server on: http://localhost:5000
- Frontend development server on: http://localhost:3000

#### Production Build Test
```bash
# Build both frontend and backend
npm run build

# Start the production server
npm start
```

This will serve both frontend and backend from: http://localhost:5000

## 🧪 Testing the Application

### 1. Check Backend API
```bash
# Test the health endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "message": "Hotel Booking API is running!",
  "status": "healthy"
}
```

### 2. Test Frontend
- Open http://localhost:3000 (development) or http://localhost:5000 (production)
- Navigate through the application
- Test user registration and login
- Browse hotels and test search functionality

### 3. Test Database Connection
```bash
cd backend
npm run test-connection
```

## 🚀 Deployment to Render.com

### 1. Prepare for Deployment

The application is configured for single-server deployment on Render.com. The backend serves the frontend static files.

### 2. Environment Variables on Render

Set these environment variables in your Render dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `NODE_ENV`: production
- `PORT`: 10000 (Render's default)

### 3. Deploy

1. Connect your GitHub repository to Render
2. Use the `render.yaml` configuration file
3. Render will automatically:
   - Install dependencies
   - Build the application
   - Start the server

### 4. Build Commands

Render will execute these commands:
```bash
# Install all dependencies
npm run install-all

# Build both frontend and backend
npm run build

# Start the server
npm start
```

## 📁 Project Structure

```
hotel-booking-application/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── scripts/        # Database seeding scripts
│   │   └── server.ts       # Main server file
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and constants
│   │   └── main.tsx       # App entry point
│   └── package.json
├── package.json           # Root package.json
├── render.yaml           # Render deployment config
└── README.md
```

## 🔧 Available Scripts

### Root Directory
- `npm run install-all`: Install dependencies for all packages
- `npm run build`: Build both frontend and backend
- `npm start`: Start the production server
- `npm run dev`: Run both frontend and backend in development

### Backend Directory
- `npm run dev`: Start development server with nodemon
- `npm run build`: Build TypeScript and copy frontend
- `npm start`: Start production server
- `npm run seed:hotels`: Seed database with sample hotels
- `npm run test-connection`: Test MongoDB connection

### Frontend Directory
- `npm run dev`: Start Vite development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in config.env
   - Test connection with `npm run test-connection`

2. **Port Already in Use**
   - Change the PORT in config.env
   - Kill processes using the port: `lsof -ti:5000 | xargs kill -9`

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npx tsc --noEmit`

4. **Frontend Not Loading**
   - Ensure backend is running
   - Check browser console for errors
   - Verify API endpoints are accessible

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create hotel (protected)
- `PUT /api/hotels/:id` - Update hotel (protected)
- `DELETE /api/hotels/:id` - Delete hotel (protected)

### Health Check
- `GET /api/health` - API health status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
