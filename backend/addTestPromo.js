import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promo from './models/Promo.js';

dotenv.config();

const addTestPromo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const newPromo = new Promo({
            text: '🎁 SPECIAL TEST OFFER: 10% OFF!'
        });

        await newPromo.save();
        console.log('Test promo saved successfully');

        const promos = await Promo.find({});
        console.log('All promos now:', promos);
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

addTestPromo();
