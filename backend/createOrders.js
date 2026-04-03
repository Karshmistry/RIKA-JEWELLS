import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const createOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RikaJewels');
        console.log('MongoDB Connected');

        // 1. Find a user to assign orders to
        const user = await User.findOne({});
        if (!user) {
            console.log('No users found. Please run createAdmin.js first or register a user.');
            process.exit();
        }

        // 2. Find or Create Products
        let products = await Product.find({}).limit(2);
        if (products.length === 0) {
            console.log('No products found. Creating sample products...');
            const sampleProducts = [
                {
                    user: user._id,
                    name: 'Diamond Ring',
                    image: '/images/ring.jpg',
                    brand: 'Rika',
                    category: 'Ring',
                    description: 'Beautiful diamond ring',
                    price: 50000,
                    countInStock: 10,
                    rating: 4.5,
                    numReviews: 12
                },
                {
                    user: user._id,
                    name: 'Gold Necklace',
                    image: '/images/necklace.jpg',
                    brand: 'Rika',
                    category: 'Necklace',
                    description: 'Elegant gold necklace',
                    price: 75000,
                    countInStock: 5,
                    rating: 4.8,
                    numReviews: 8
                }
            ];
            products = await Product.insertMany(sampleProducts);
            console.log('✅ Sample products created');
        }

        // 3. Create Dummy Orders
        const orders = [
            {
                orderId: 'ORD-' + Date.now(),
                user: user._id,
                items: [
                    {
                        product: products[0]._id,
                        name: products[0].name,
                        image: products[0].image || 'https://via.placeholder.com/150',
                        quantity: 1,
                        price: products[0].price,
                        size: 'M',
                    }
                ],
                shippingAddress: {
                    name: user.name,
                    phone: user.phone,
                    address: '123 Test St',
                    city: 'Test City',
                    state: 'Test State',
                    pincode: '123456'
                },
                payment: {
                    method: 'COD',
                    status: 'pending'
                },
                totalAmount: products[0].price,
                status: 'processing'
            },
            {
                orderId: 'ORD-' + (Date.now() + 1),
                user: user._id,
                items: products.map(p => ({
                    product: p._id,
                    name: p.name,
                    image: p.image || 'https://via.placeholder.com/150',
                    quantity: 1,
                    price: p.price,
                    size: 'Free',
                })),
                shippingAddress: {
                    name: user.name,
                    phone: user.phone,
                    address: '456 Sample Rd',
                    city: 'Sample City',
                    state: 'Sample State',
                    pincode: '654321'
                },
                payment: {
                    method: 'Card',
                    status: 'paid',
                    transactionId: 'TXN123456789'
                },
                totalAmount: products.reduce((acc, p) => acc + p.price, 0),
                status: 'delivered'
            }
        ];

        await Order.insertMany(orders);
        console.log('✅ Dummy orders created successfully!');
        process.exit();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createOrders();
