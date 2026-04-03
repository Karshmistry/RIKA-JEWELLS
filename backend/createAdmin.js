import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RikaJewels');
        console.log('MongoDB Connected');

        const adminEmail = 'admin@rikajewels.com';
        const adminPassword = 'admin123'; // Change this in production

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            if (userExists.role !== 'admin') {
                userExists.role = 'admin';
                await userExists.save();
                console.log('Existing user updated to Admin role');
            } else {
                console.log('Admin user already exists and has admin role');
            }
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const adminUser = await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            phone: '1234567890',
            role: 'admin'
        });

        console.log(`Admin user created: ${adminUser.email} / ${adminPassword}`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
