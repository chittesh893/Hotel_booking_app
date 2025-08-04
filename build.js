const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build process...');

try {
    // Step 1: Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm run install-all', { stdio: 'inherit' });

    // Step 2: Build frontend
    console.log('⚛️ Building frontend...');
    execSync('npm run build:frontend', { stdio: 'inherit' });

    // Step 3: Verify frontend build
    const frontendDistPath = path.join(__dirname, 'frontend', 'dist');
    if (!fs.existsSync(frontendDistPath)) {
        throw new Error('Frontend dist folder not found!');
    }

    const indexHtmlPath = path.join(frontendDistPath, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        throw new Error('Frontend index.html not found!');
    }

    console.log('✅ Frontend build verified');

    // Step 4: Build backend
    console.log('🔧 Building backend...');
    execSync('npm run build:backend', { stdio: 'inherit' });

    // Step 5: Verify backend build
    const backendDistPath = path.join(__dirname, 'backend', 'dist');
    if (!fs.existsSync(backendDistPath)) {
        throw new Error('Backend dist folder not found!');
    }

    const frontendInBackendPath = path.join(backendDistPath, 'frontend', 'dist');
    if (!fs.existsSync(frontendInBackendPath)) {
        throw new Error('Frontend files not copied to backend!');
    }

    console.log('✅ Backend build verified');
    console.log('🎉 Build completed successfully!');

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
} 