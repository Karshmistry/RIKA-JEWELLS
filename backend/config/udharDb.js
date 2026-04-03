import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const UDHAR_MONGO_URI = process.env.UDHAR_MONGO_URI || 'mongodb://localhost:27017/RikaJewels_Udhar';

const udharConnection = mongoose.createConnection(UDHAR_MONGO_URI);

udharConnection.on('connected', () => {
    console.log('✅ Udhar Database Connected');
});

udharConnection.on('error', (err) => {
    console.error('❌ Udhar Database Connection Error:', err);
});

export default udharConnection;
