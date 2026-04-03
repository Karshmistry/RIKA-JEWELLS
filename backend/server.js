import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables immediately
dotenv.config();

// Route Imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import udariRoutes from './routes/udariRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// ========================
// MIDDLEWARE SETUP
// ========================

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n📥 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ========================
// DATABASE CONNECTION
// ========================

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RikaJewels';
    await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ========================
// ROUTES
// ========================

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/banners', bannerRoutes);
console.log('📦 Registering Udari routes...');
app.use('/api/udari', udariRoutes);
console.log('✅ Udari routes registered.');
app.use('/api/contacts', contactRoutes);

// Test route to verify Udari API is reachable
app.get('/api/udari-test', (req, res) => {
  res.json({ success: true, message: 'Udari API is working!' });
});

// Use existing __dirname to serve uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Fallback for cart/users if needed later
// app.use('/api/users', userRoutes);
// app.use('/api/cart', cartRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ========================
// ERROR HANDLING
// ========================

app.use((err, req, res, next) => {
  console.error('🔥 Global Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ========================
// START SERVER
// ========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;