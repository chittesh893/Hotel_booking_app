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

    // Step 4: Build backend (without copying frontend)
    console.log('🔧 Building backend...');
    execSync('cd backend && npm install && tsc', { stdio: 'inherit' });

    // Step 5: Copy frontend files manually
    console.log('📁 Copying frontend files to backend...');
    const backendDistPath = path.join(__dirname, 'backend', 'dist');
    const frontendInBackendPath = path.join(backendDistPath, 'frontend', 'dist');

    // Create directory if it doesn't exist
    if (!fs.existsSync(path.dirname(frontendInBackendPath))) {
        fs.mkdirSync(path.dirname(frontendInBackendPath), { recursive: true });
    }

    // Copy files using Node.js fs
    function copyDir(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    copyDir(frontendDistPath, frontendInBackendPath);
    console.log('✅ Frontend files copied successfully');

    // Step 6: Verify backend build
    if (!fs.existsSync(backendDistPath)) {
        throw new Error('Backend dist folder not found!');
    }

    if (!fs.existsSync(frontendInBackendPath)) {
        throw new Error('Frontend files not copied to backend!');
    }

    console.log('✅ Backend build verified');
    console.log('🎉 Build completed successfully!');

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
} 