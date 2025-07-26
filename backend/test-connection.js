const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection string:', process.env.MONGODB_URI);

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB Connected Successfully!');
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);

        // Test a simple operation
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        await mongoose.disconnect();
        console.log('Connection closed.');

    } catch (error) {
        console.error('❌ Connection failed:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);

        if (error.message.includes('bad auth')) {
            console.log('\n🔍 Authentication Error - Possible solutions:');
            console.log('1. Check if username and password are correct');
            console.log('2. Verify the user exists in MongoDB Atlas');
            console.log('3. Ensure the user has access to the database');
            console.log('4. Check if your IP is whitelisted in MongoDB Atlas');
        }

        process.exit(1);
    }
}

testConnection(); 