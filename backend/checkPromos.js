import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promo from './models/Promo.js';

dotenv.config();

const checkPromos = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const promos = await Promo.find({});
        console.log('Promos found:', promos);
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkPromos();
