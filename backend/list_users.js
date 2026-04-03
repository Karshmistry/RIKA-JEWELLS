
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RikaJewels');
        console.log('MongoDB Connected');

        const users = await User.find({}, 'name email role');
        console.log('--- USERS START ---');
        console.log(JSON.stringify(users, null, 2));
        console.log('--- USERS END ---');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listUsers();
