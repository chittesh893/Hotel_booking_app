#!/bin/bash

# Install dependencies
echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Build backend
echo "Building backend..."
cd backend
npm run build
cd ..

echo "Build completed successfully!" 