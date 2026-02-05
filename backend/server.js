
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // ES module fix for __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();

// // ========================
// // MIDDLEWARE SETUP
// // ========================

// // Enable CORS
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   credentials: true
// }));

// // Parse JSON bodies
// app.use(express.json({ limit: '10mb' }));

// // Parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Request logging middleware
// app.use((req, res, next) => {
//   const timestamp = new Date().toISOString();
//   console.log(`\n📥 [${timestamp}] ${req.method} ${req.originalUrl}`);
  
//   // Log headers (but hide sensitive info)
//   const headers = { ...req.headers };
//   if (headers.authorization) {
//     headers.authorization = 'Bearer *****';
//   }
//   if (headers.cookie) {
//     headers.cookie = '*****';
//   }
  
//   // Log body for non-GET requests
//   if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
//     console.log('📦 Body:', JSON.stringify(req.body, null, 2));
//   }
  
//   next();
// });

// // ========================
// // DATABASE CONNECTION
// // ========================

// const connectDB = async () => {
//   try {
//     console.log('\n🔗 Connecting to MongoDB...');
    
//     const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/RikaJewels';
    
//     await mongoose.connect(MONGO_URI, {
//       // Remove deprecated options for Mongoose 9+
//     });
    
//     console.log('✅ MongoDB Connected Successfully!');
//     console.log(`📊 Database: ${mongoose.connection.name}`);
//     console.log(`🌐 Host: ${mongoose.connection.host}`);
//     console.log(`🚪 Port: ${mongoose.connection.port}`);
//     console.log(`⚡ Ready State: ${mongoose.connection.readyState}`);
    
//     // Database connection events
//     mongoose.connection.on('connected', () => {
//       console.log('✅ Mongoose connected to DB');
//     });
    
//     mongoose.connection.on('error', (err) => {
//       console.error(`❌ Mongoose connection error: ${err.message}`);
//     });
    
//     mongoose.connection.on('disconnected', () => {
//       console.log('⚠️ Mongoose disconnected from DB');
//     });
    
//   } catch (error) {
//     console.error('❌ MongoDB Connection Failed:', error.message);
//     console.log('\n💡 TROUBLESHOOTING:');
//     console.log('1. Make sure MongoDB is running:');
//     console.log('   Open new terminal and run: mongod --dbpath "C:\\data\\db"');
//     console.log('2. Or install MongoDB Compass (GUI)');
//     console.log('⚠️ Server will continue without database...');
//   }
// };

// connectDB();

// // ========================
// // STATIC FILES (for future use)
// // ========================

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ========================
// // TEST & HEALTH ENDPOINTS
// // ========================

// // Health check endpoint
// app.get('/health', (req, res) => {
//   const dbStatus = mongoose.connection.readyState;
  
//   res.status(200).json({
//     success: true,
//     status: 'operational',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     database: {
//       connected: dbStatus === 1,
//       status: dbStatus,
//       statusText: ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'][dbStatus] || 'Unknown'
//     },
//     memory: {
//       rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
//       heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
//       heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
//     },
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // JSON test endpoint
// app.post('/api/test/json', (req, res) => {
//   console.log('🎯 JSON Test Endpoint Called');
  
//   res.status(200).json({
//     success: true,
//     message: '✅ JSON parsing is working correctly!',
//     data: {
//       headers: {
//         'content-type': req.headers['content-type'],
//         authorization: req.headers['authorization'] ? 'Present (hidden)' : 'Not present'
//       },
//       body: req.body,
//       bodyType: typeof req.body,
//       bodyKeys: Object.keys(req.body || {}),
//       bodySize: JSON.stringify(req.body || {}).length
//     },
//     instructions: 'If you see your data here, your POST request is working correctly!'
//   });
// });

// // Echo endpoint
// app.post('/api/echo', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Echo endpoint',
//     received: req.body,
//     timestamp: new Date().toISOString(),
//     headers: req.headers
//   });
// });

// // ========================
// // IMPORT ROUTES
// // ========================

// // Import and use auth routes
// try {
//   const authModule = await import('./routes/authRoutes.js');
//   app.use('/api/auth', authModule.default);
//   console.log('✅ Auth routes loaded');
// } catch (error) {
//   console.log('⚠️ Auth routes not found, skipping...');
// }

// // Import and use product routes
// try {
//   const productModule = await import('./routes/productRoutes.js');
//   app.use('/api/products', productModule.default);
//   console.log('✅ Product routes loaded');
// } catch (error) {
//   console.log('⚠️ Product routes not found, skipping...');
// }

// // Import and use user routes
// try {
//   const userModule = await import('./routes/userRoutes.js');
//   app.use('/api/users', userModule.default);
//   console.log('✅ User routes loaded');
// } catch (error) {
//   console.log('⚠️ User routes not found, skipping...');
// }

// // Import and use order routes
// try {
//   const orderModule = await import('./routes/orderRoutes.js');
//   app.use('/api/orders', orderModule.default);
//   console.log('✅ Order routes loaded');
// } catch (error) {
//   console.log('⚠️ Order routes not found, skipping...');
// }

// // Import and use cart routes
// try {
//   const cartModule = await import('./routes/cartRoutes.js');
//   app.use('/api/cart', cartModule.default);
//   console.log('✅ Cart routes loaded');
// } catch (error) {
//   console.log('⚠️ Cart routes not found, skipping...');
// }

// // ========================
// // BASIC AUTH ENDPOINTS (Fallback if routes fail)
// // ========================

// // Direct registration endpoint (fallback)
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     console.log('🔐 Direct auth/register called:', req.body);
    
//     const { name, email, password, phone } = req.body;
    
//     // Validation
//     if (!name || !email || !password || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields required: name, email, password, phone'
//       });
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid email format'
//       });
//     }
    
//     // Check if database is connected
//     if (mongoose.connection.readyState !== 1) {
//       return res.status(201).json({
//         success: true,
//         message: 'User registered successfully (mock - database not connected)',
//         user: {
//           id: 'mock_' + Date.now(),
//           name,
//           email,
//           phone,
//           role: 'user'
//         },
//         token: 'mock_token_' + Date.now(),
//         note: 'MongoDB is not connected. Connect MongoDB to save real data.'
//       });
//     }
    
//     const db = mongoose.connection.db;
    
//     // Check if user exists
//     const existing = await db.collection('users').findOne({ email });
    
//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email'
//       });
//     }
    
//     // Hash password
//     let hashedPassword;
//     try {
//       const bcrypt = await import('bcryptjs');
//       hashedPassword = await bcrypt.hash(password, 10);
//     } catch (bcryptError) {
//       console.error('❌ Bcrypt error:', bcryptError.message);
//       hashedPassword = password; // Fallback for testing
//     }
    
//     // Generate JWT token
//     let token;
//     try {
//       const jwt = await import('jsonwebtoken');
//       token = jwt.sign(
//         { email, name },
//         process.env.JWT_SECRET || 'default_secret',
//         { expiresIn: '7d' }
//       );
//     } catch (jwtError) {
//       console.error('❌ JWT error:', jwtError.message);
//       token = 'mock_token_' + Date.now();
//     }
    
//     // Insert user
//     const result = await db.collection('users').insertOne({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       role: 'user',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });
    
//     console.log('✅ User registered via direct endpoint:', result.insertedId);
    
//     res.status(201).json({
//       success: true,
//       token,
//       user: {
//         id: result.insertedId,
//         name,
//         email,
//         phone,
//         role: 'user'
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Direct auth register error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       error: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// // Direct login endpoint (fallback)
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     console.log('🔐 Direct auth/login called:', req.body);
    
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password required'
//       });
//     }
    
//     // Check if database is connected
//     if (mongoose.connection.readyState !== 1) {
//       return res.status(200).json({
//         success: true,
//         message: 'Login successful (mock - database not connected)',
//         token: 'mock_token_' + Date.now(),
//         user: {
//           id: 'mock_user_id',
//           email,
//           name: 'Mock User',
//           role: 'user'
//         },
//         note: 'MongoDB is not connected. Connect MongoDB for real authentication.'
//       });
//     }
    
//     const db = mongoose.connection.db;
//     const user = await db.collection('users').findOne({ email });
    
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }
    
//     // Verify password
//     let isMatch = false;
//     try {
//       const bcrypt = await import('bcryptjs');
//       isMatch = await bcrypt.compare(password, user.password);
//     } catch (bcryptError) {
//       console.error('❌ Bcrypt compare error:', bcryptError.message);
//       // Fallback: simple string comparison (not secure for production)
//       isMatch = password === user.password;
//     }
    
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }
    
//     // Generate JWT token
//     let token;
//     try {
//       const jwt = await import('jsonwebtoken');
//       token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET || 'default_secret',
//         { expiresIn: '7d' }
//       );
//     } catch (jwtError) {
//       console.error('❌ JWT error:', jwtError.message);
//       token = 'mock_token_' + Date.now();
//     }
    
//     // Remove password from response
//     delete user.password;
    
//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Direct auth login error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// });

// // ========================
// // ROOT ENDPOINT
// // ========================

// app.get('/', (req, res) => {
//   const dbConnected = mongoose.connection.readyState === 1;
  
//   res.status(200).json({
//     success: true,
//     message: '🚀 Rika Jewels E-commerce API',
//     version: '1.0.0',
//     status: 'Online',
//     database: dbConnected ? 'Connected ✅' : 'Disconnected ⚠️',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       health: 'GET /health',
//       auth: {
//         register: 'POST /api/auth/register',
//         login: 'POST /api/auth/login'
//       },
//       test: {
//         jsonTest: 'POST /api/test/json',
//         echo: 'POST /api/echo'
//       },
//       api: {
//         auth: '/api/auth/*',
//         products: '/api/products/*',
//         users: '/api/users/*',
//         orders: '/api/orders/*',
//         cart: '/api/cart/*'
//       }
//     },
//     environment: process.env.NODE_ENV || 'development',
//     documentation: 'Check README.md for detailed API documentation'
//   });
// });

// // ========================
// // ERROR HANDLING MIDDLEWARE
// // ========================

// // 404 - Route not found
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//     suggestion: 'Check available endpoints at GET /',
//     availableEndpoints: {
//       GET: ['/', '/health'],
//       POST: [
//         '/api/test/json',
//         '/api/echo',
//         '/api/auth/register',
//         '/api/auth/login'
//       ]
//     }
//   });
// });

// // ========================
// // DEBUG ENDPOINT - Check database
// // ========================

// app.get('/api/debug/database', async (req, res) => {
//   try {
//     const dbConnected = mongoose.connection.readyState === 1;
    
//     if (!dbConnected) {
//       return res.json({
//         success: false,
//         message: 'Database not connected',
//         readyState: mongoose.connection.readyState
//       });
//     }
    
//     const db = mongoose.connection.db;
//     const databaseName = mongoose.connection.name;
    
//     // Get all collections
//     const collections = await db.listCollections().toArray();
//     const collectionNames = collections.map(c => c.name);
    
//     // Get user count
//     let userCount = 0;
//     let users = [];
    
//     if (collectionNames.includes('users')) {
//       userCount = await db.collection('users').countDocuments();
//       users = await db.collection('users').find({}, { 
//         projection: { password: 0 } 
//       }).limit(10).toArray();
//     }
    
//     res.json({
//       success: true,
//       database: {
//         name: databaseName,
//         connected: true,
//         host: mongoose.connection.host,
//         port: mongoose.connection.port
//       },
//       collections: collectionNames,
//       users: {
//         count: userCount,
//         sample: users
//       }
//     });
    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('🔥 Global Error Handler:', err);
  
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
  
//   res.status(statusCode).json({
//     success: false,
//     message: message,
//     error: process.env.NODE_ENV === 'production' ? undefined : {
//       stack: err.stack,
//       details: err
//     },
//     timestamp: new Date().toISOString()
//   });
// });

// // ========================
// // START SERVER
// // ========================

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log('\n' + '='.repeat(60));
//   console.log('🚀 RIKA JEWELS BACKEND SERVER STARTED');
//   console.log('='.repeat(60));
//   console.log(`📡 Server URL: http://localhost:${PORT}`);
//   console.log(`🌐 Also accessible at: http://127.0.0.1:${PORT}`);
//   console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Not Connected ❌'}`);
//   console.log(`⏰ Started at: ${new Date().toISOString()}`);
//   console.log('='.repeat(60));
  
//   console.log('\n📋 QUICK TEST ENDPOINTS:');
//   console.log('1. Check if server is running:');
//   console.log(`   GET http://localhost:${PORT}/`);
//   console.log('\n2. Test JSON parsing (POST request):');
//   console.log(`   POST http://localhost:${PORT}/api/test/json`);
//   console.log('   Headers: Content-Type: application/json');
//   console.log('   Body: {"test": "Hello World"}');
//   console.log('\n3. Register a new user:');
//   console.log(`   POST http://localhost:${PORT}/api/auth/register`);
//   console.log('   Headers: Content-Type: application/json');
//   console.log('   Body: {"name": "John Doe", "email": "john@example.com", "password": "123456", "phone": "9876543210"}');
//   console.log('\n4. Login user:');
//   console.log(`   POST http://localhost:${PORT}/api/auth/login`);
//   console.log('   Headers: Content-Type: application/json');
//   console.log('   Body: {"email": "john@example.com", "password": "123456"}');
//   console.log('\n' + '='.repeat(60));
// });

// // Graceful shutdown
// process.on('SIGINT', () => {
//   console.log('\n⚠️ Received SIGINT. Shutting down gracefully...');
//   server.close(() => {
//     console.log('✅ HTTP server closed');
//     mongoose.connection.close(false, () => {
//       console.log('✅ MongoDB connection closed');
//       console.log('👋 Server shutdown complete');
//       process.exit(0);
//     });
//   });
// });

// process.on('SIGTERM', () => {
//   console.log('\n⚠️ Received SIGTERM. Shutting down gracefully...');
//   server.close(() => {
//     console.log('✅ HTTP server closed');
//     mongoose.connection.close(false, () => {
//       console.log('✅ MongoDB connection closed');
//       console.log('👋 Server shutdown complete');
//       process.exit(0);
//     });
//   });
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('🔥 Unhandled Promise Rejection:', err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('🔥 Uncaught Exception:', err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// export default app;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// ========================
// MIDDLEWARE SETUP
// ========================

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n📥 [${timestamp}] ${req.method} ${req.originalUrl}`);
  
  // Log headers (but hide sensitive info)
  const headers = { ...req.headers };
  if (headers.authorization) {
    headers.authorization = 'Bearer *****';
  }
  if (headers.cookie) {
    headers.cookie = '*****';
  }
  
  // Log body for non-GET requests
  if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
  }
  
  next();
});

// ========================
// DATABASE CONNECTION
// ========================

const connectDB = async () => {
  try {
    console.log('\n🔗 Connecting to MongoDB...');
    
    const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/RikaJewels';
    
    await mongoose.connect(MONGO_URI, {
      // Remove deprecated options for Mongoose 9+
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🚪 Port: ${mongoose.connection.port}`);
    console.log(`⚡ Ready State: ${mongoose.connection.readyState}`);
    
    // Database connection events
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error(`❌ Mongoose connection error: ${err.message}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Mongoose disconnected from DB');
    });
    
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.log('\n💡 TROUBLESHOOTING:');
    console.log('1. Make sure MongoDB is running:');
    console.log('   Open new terminal and run: mongod --dbpath "C:\\data\\db"');
    console.log('2. Or install MongoDB Compass (GUI)');
    console.log('⚠️ Server will continue without database...');
  }
};

connectDB();

// ========================
// STATIC FILES (for future use)
// ========================

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========================
// TEST & HEALTH ENDPOINTS
// ========================

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  
  res.status(200).json({
    success: true,
    status: 'operational',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      connected: dbStatus === 1,
      status: dbStatus,
      statusText: ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'][dbStatus] || 'Unknown'
    },
    memory: {
      rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// JSON test endpoint
app.post('/api/test/json', (req, res) => {
  console.log('🎯 JSON Test Endpoint Called');
  
  res.status(200).json({
    success: true,
    message: '✅ JSON parsing is working correctly!',
    data: {
      headers: {
        'content-type': req.headers['content-type'],
        authorization: req.headers['authorization'] ? 'Present (hidden)' : 'Not present'
      },
      body: req.body,
      bodyType: typeof req.body,
      bodyKeys: Object.keys(req.body || {}),
      bodySize: JSON.stringify(req.body || {}).length
    },
    instructions: 'If you see your data here, your POST request is working correctly!'
  });
});

// Echo endpoint
app.post('/api/echo', (req, res) => {
  res.json({
    success: true,
    message: 'Echo endpoint',
    received: req.body,
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// ========================
// DEBUG BCrypt Endpoint (Add this!)
// ========================

app.post('/api/debug/test-bcrypt', async (req, res) => {
  try {
    const { password } = req.body || { password: 'test123' };
    
    console.log('\n' + '='.repeat(60));
    console.log('🧪 BCrypt DEBUG TEST STARTED');
    console.log('='.repeat(60));
    
    console.log('1. Testing bcryptjs import...');
    
    let bcrypt;
    let hashedPassword;
    
    // Test different import methods
    try {
      // Method 1: Regular import
      console.log('   Method 1: Regular import...');
      const bcryptModule = await import('bcryptjs');
      bcrypt = bcryptModule.default || bcryptModule;
      console.log('   ✅ Import successful');
      console.log('   ✅ bcrypt type:', typeof bcrypt);
      console.log('   ✅ Has .hash?', typeof bcrypt.hash === 'function');
      console.log('   ✅ Has .compare?', typeof bcrypt.compare === 'function');
      
    } catch (importError) {
      console.error('   ❌ Import failed:', importError.message);
      return res.status(500).json({
        success: false,
        message: 'bcryptjs import failed',
        error: importError.message
      });
    }
    
    // Test hashing
    try {
      console.log('\n2. Testing bcrypt.hash()...');
      console.log('   Password to hash:', password);
      
      hashedPassword = await bcrypt.hash(password, 10);
      
      console.log('   ✅ Hash generated!');
      console.log('   ✅ Hash:', hashedPassword);
      console.log('   ✅ Hash length:', hashedPassword.length);
      console.log('   ✅ Hash starts with:', hashedPassword.substring(0, 10));
      
      if (hashedPassword.length !== 60) {
        console.warn('   ⚠️ WARNING: Hash length is not 60! Expected bcrypt hash to be 60 chars');
      }
      
      if (!hashedPassword.startsWith('$2a$') && !hashedPassword.startsWith('$2b$')) {
        console.warn('   ⚠️ WARNING: Hash does not start with $2a$ or $2b$');
      }
      
    } catch (hashError) {
      console.error('   ❌ Hashing failed:', hashError.message);
      return res.status(500).json({
        success: false,
        message: 'bcrypt.hash() failed',
        error: hashError.message
      });
    }
    
    // Test comparison
    try {
      console.log('\n3. Testing bcrypt.compare()...');
      
      const correctMatch = await bcrypt.compare(password, hashedPassword);
      console.log('   ✅ Compare correct password:', correctMatch);
      
      const wrongMatch = await bcrypt.compare('wrongpassword', hashedPassword);
      console.log('   ✅ Compare wrong password:', wrongMatch);
      
      // Test comparing with plain text (should be false)
      const plainTextMatch = await bcrypt.compare(password, password);
      console.log('   ✅ Compare with plain text (should be false):', plainTextMatch);
      
    } catch (compareError) {
      console.error('   ❌ Comparison failed:', compareError.message);
      return res.status(500).json({
        success: false,
        message: 'bcrypt.compare() failed',
        error: compareError.message
      });
    }
    
    console.log('\n🎉 All bcrypt tests passed!');
    console.log('='.repeat(60));
    
    res.json({
      success: true,
      tests: {
        import: 'passed',
        hash: 'passed',
        compare: 'passed'
      },
      hash: hashedPassword,
      hashLength: hashedPassword.length,
      hashStartsWith: hashedPassword.substring(0, 10)
    });
    
  } catch (error) {
    console.error('❌ Debug test failed:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ========================
// IMPORT ROUTES
// ========================

// Import and use auth routes
try {
  const authModule = await import('./routes/authRoutes.js');
  app.use('/api/auth', authModule.default);
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('⚠️ Auth routes not found, skipping...');
}

// Import and use product routes
try {
  const productModule = await import('./routes/productRoutes.js');
  app.use('/api/products', productModule.default);
  console.log('✅ Product routes loaded');
} catch (error) {
  console.log('⚠️ Product routes not found, skipping...');
}

// Import and use user routes
try {
  const userModule = await import('./routes/userRoutes.js');
  app.use('/api/users', userModule.default);
  console.log('✅ User routes loaded');
} catch (error) {
  console.log('⚠️ User routes not found, skipping...');
}

// Import and use order routes
try {
  const orderModule = await import('./routes/orderRoutes.js');
  app.use('/api/orders', orderModule.default);
  console.log('✅ Order routes loaded');
} catch (error) {
  console.log('⚠️ Order routes not found, skipping...');
}

// Import and use cart routes
try {
  const cartModule = await import('./routes/cartRoutes.js');
  app.use('/api/cart', cartModule.default);
  console.log('✅ Cart routes loaded');
} catch (error) {
  console.log('⚠️ Cart routes not found, skipping...');
}

// ========================
// BASIC AUTH ENDPOINTS (Fallback if routes fail)
// ========================

// Direct registration endpoint - COMPLETELY REVISED WITH BETTER DEBUGGING
app.post('/api/auth/register', async (req, res) => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 REGISTRATION REQUEST RECEIVED');
  console.log('='.repeat(60));
  
  // Store the result variable at the top level so it's accessible in catch block
  let result;
  
  try {
    const { name, email, password, phone } = req.body;
    console.log('📝 Input data:', { 
      name: name?.substring(0, 20) + (name?.length > 20 ? '...' : ''),
      email,
      phone,
      passwordLength: password?.length || 0,
      passwordSample: password ? password.substring(0, 3) + '***' : 'none'
    });
    
    // Validation
    if (!name || !email || !password || !phone) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields required: name, email, password, phone'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ Database not connected, returning mock response');
      return res.status(201).json({
        success: true,
        message: 'User registered successfully (mock - database not connected)',
        user: {
          id: 'mock_' + Date.now(),
          name,
          email,
          phone,
          role: 'user'
        },
        token: 'mock_token_' + Date.now(),
        note: 'MongoDB is not connected. Connect MongoDB to save real data.'
      });
    }
    
    const db = mongoose.connection.db;
    
    // Check if user exists
    console.log('🔍 Checking if user already exists...');
    const existing = await db.collection('users').findOne({ email });
    
    if (existing) {
      console.log('❌ User already exists with email:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    console.log('✅ No existing user found');
    
    // ============================================
    // PASSWORD HASHING - EXTENSIVE DEBUGGING
    // ============================================
    console.log('\n' + '-'.repeat(40));
    console.log('🔐 PASSWORD HASHING PROCESS');
    console.log('-'.repeat(40));
    
    let hashedPassword;
    let bcrypt;
    
    try {
      console.log('1. Importing bcryptjs...');
      
      // Try different import methods
      try {
        const bcryptModule = await import('bcryptjs');
        bcrypt = bcryptModule.default || bcryptModule;
        console.log('   ✅ Import method 1 successful');
      } catch (err1) {
        console.log('   ❌ Import method 1 failed:', err1.message);
        // Try alternative
        bcrypt = (await import('bcryptjs')).default;
        console.log('   ✅ Import method 2 successful');
      }
      
      console.log('   ✅ Bcrypt object:', typeof bcrypt);
      console.log('   ✅ Has .hash?', typeof bcrypt.hash === 'function');
      console.log('   ✅ Has .compare?', typeof bcrypt.compare === 'function');
      
      if (typeof bcrypt.hash !== 'function') {
        throw new Error('bcrypt.hash is not a function. Check bcryptjs installation.');
      }
      
      console.log('\n2. Hashing password...');
      console.log('   Password to hash:', password.substring(0, 3) + '***');
      console.log('   Password length:', password.length);
      
      // IMPORTANT: Make sure we're actually calling bcrypt.hash
      hashedPassword = await bcrypt.hash(password, 10);
      
      console.log('   ✅ Hash function returned');
      console.log('   ✅ Hash type:', typeof hashedPassword);
      console.log('   ✅ Hash value:', hashedPassword);
      console.log('   ✅ Hash length:', hashedPassword.length);
      console.log('   ✅ Hash starts with:', hashedPassword.substring(0, 10));
      
      // CRITICAL CHECKS
      if (!hashedPassword) {
        throw new Error('bcrypt.hash returned undefined or null');
      }
      
      if (typeof hashedPassword !== 'string') {
        throw new Error(`bcrypt.hash returned non-string: ${typeof hashedPassword}`);
      }
      
      if (hashedPassword === password) {
        throw new Error('bcrypt.hash returned the plain password instead of a hash!');
      }
      
      if (hashedPassword.length < 50) {
        console.warn('   ⚠️ WARNING: Hash seems short. Expected ~60 chars');
      }
      
      // Test the hash immediately
      console.log('\n3. Testing the hash immediately...');
      const testMatch = await bcrypt.compare(password, hashedPassword);
      console.log('   ✅ Test comparison result:', testMatch);
      
      if (!testMatch) {
        console.warn('   ⚠️ WARNING: Hash self-test failed!');
      }
      
    } catch (bcryptError) {
      console.error('\n❌ BCRYPT HASHING FAILED!');
      console.error('   Error:', bcryptError.message);
      console.error('   Stack:', bcryptError.stack);
      
      // Emergency fallback - create a fake hash to at least save something
      console.log('   ⚡ Creating emergency fallback hash...');
      hashedPassword = `$2a$10$EMERGENCY${Buffer.from(`${password}:${Date.now()}`).toString('base64')}`;
      console.log('   ⚡ Emergency hash created:', hashedPassword.substring(0, 30) + '...');
    }
    
    console.log('✅ Password hashing completed');
    console.log('-'.repeat(40));
    // ============================================
    
    // ============================================
    // CREATE AND SAVE USER DOCUMENT
    // ============================================
    console.log('\n' + '-'.repeat(40));
    console.log('💾 SAVING TO DATABASE');
    console.log('-'.repeat(40));
    
    const userDoc = {
      name,
      email,
      password: hashedPassword, // This MUST be the hashed password
      phone,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('📄 User document to save:');
    console.log('   name:', userDoc.name);
    console.log('   email:', userDoc.email);
    console.log('   phone:', userDoc.phone);
    console.log('   password length:', userDoc.password.length);
    console.log('   password starts with:', userDoc.password.substring(0, 10));
    console.log('   password is plain text?', userDoc.password === password ? 'YES ⚠️' : 'NO ✅');
    
    try {
      result = await db.collection('users').insertOne(userDoc);
      console.log('✅ Database insert successful');
      console.log('   Inserted ID:', result.insertedId);
      console.log('   Acknowledged:', result.acknowledged);
      
    } catch (dbError) {
      console.error('❌ Database insert failed:', dbError.message);
      throw dbError;
    }
    
    // VERIFY THE SAVED DATA
    console.log('\n🔍 VERIFYING SAVED DATA...');
    const savedUser = await db.collection('users').findOne({ _id: result.insertedId });
    
    if (!savedUser) {
      console.error('❌ Could not find saved user!');
      throw new Error('User not found after insertion');
    }
    
    console.log('   ✅ User found in database');
    console.log('   ✅ Has password field?', !!savedUser.password);
    console.log('   ✅ Password length in DB:', savedUser.password?.length || 0);
    console.log('   ✅ Password in DB starts with:', savedUser.password?.substring(0, 20) || 'NOT FOUND');
    console.log('   ✅ Password equals input?', savedUser.password === password ? 'YES ⚠️' : 'NO ✅');
    console.log('   ✅ Password equals hashed?', savedUser.password === hashedPassword ? 'YES ✅' : 'NO ❌');
    
    if (!savedUser.password) {
      throw new Error('Password was not saved to database!');
    }
    
    if (savedUser.password === password) {
      console.error('🚨 CRITICAL: Plain password saved to database!');
      // Don't throw, but log warning
    }
    
    console.log('-'.repeat(40));
    // ============================================
    
    // Generate token
    const token = 'jwt_' + Date.now(); // Simplified for now
    
    console.log('\n🎉 REGISTRATION COMPLETED SUCCESSFULLY!');
    console.log('📧 User email:', email);
    console.log('🆔 User ID:', result.insertedId);
    console.log('='.repeat(60));
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: result.insertedId,
        name,
        email,
        phone,
        role: 'user'
      },
      debug: {
        passwordSaved: !!savedUser?.password,
        passwordLength: savedUser?.password?.length || 0,
        passwordIsHashed: savedUser?.password !== password
      }
    });
    
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ REGISTRATION FAILED!');
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    console.log('='.repeat(60));
    
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
});

// Direct login endpoint - UPDATED
app.post('/api/auth/login', async (req, res) => {
  console.log('\n' + '='.repeat(60));
  console.log('🔐 LOGIN REQUEST RECEIVED');
  console.log('='.repeat(60));
  
  try {
    const { email, password } = req.body;
    console.log('📝 Login attempt for email:', email);
    console.log('🔑 Password length:', password?.length || 0);
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ Database not connected, returning mock response');
      return res.status(200).json({
        success: true,
        message: 'Login successful (mock - database not connected)',
        token: 'mock_token_' + Date.now(),
        user: {
          id: 'mock_user_id',
          email,
          name: 'Mock User',
          role: 'user'
        },
        note: 'MongoDB is not connected. Connect MongoDB for real authentication.'
      });
    }
    
    const db = mongoose.connection.db;
    
    console.log('🔍 Looking for user in database...');
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      console.log('='.repeat(60));
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    console.log('✅ User found in database');
    console.log('📋 User details:');
    console.log('   ID:', user._id);
    console.log('   Name:', user.name);
    console.log('   Email:', user.email);
    console.log('   Has password field?', !!user.password);
    console.log('   Password length in DB:', user.password?.length || 0);
    console.log('   Password in DB starts with:', user.password?.substring(0, 20) || 'NOT FOUND');
    
    if (!user.password) {
      console.log('🚨 CRITICAL: User has no password stored!');
      console.log('='.repeat(60));
      return res.status(401).json({
        success: false,
        message: 'Account error. Please register again.'
      });
    }
    
    // Check if password looks like a bcrypt hash
    const isLikelyBcrypt = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
    console.log('   Password looks like bcrypt hash?', isLikelyBcrypt ? 'YES ✅' : 'NO ⚠️');
    
    // Verify password
    console.log('\n🔑 STARTING PASSWORD COMPARISON...');
    console.log('   Input password:', password.substring(0, 3) + '***');
    console.log('   Stored password sample:', user.password.substring(0, 30) + '...');
    
    let isMatch = false;
    
    // If password doesn't look like a bcrypt hash, do direct comparison
    if (!isLikelyBcrypt) {
      console.log('⚠️ Password does not look like bcrypt hash, using direct comparison');
      isMatch = password === user.password;
      console.log('   Direct comparison result:', isMatch);
    } else {
      // Try bcrypt comparison
      try {
        const bcryptModule = await import('bcryptjs');
        const bcrypt = bcryptModule.default || bcryptModule;
        
        console.log('✅ Bcrypt imported for comparison');
        isMatch = await bcrypt.compare(password, user.password);
        console.log('✅ Bcrypt comparison result:', isMatch);
        
      } catch (bcryptError) {
        console.error('❌ Bcrypt compare error:', bcryptError.message);
        console.log('⚠️ Falling back to direct comparison');
        isMatch = password === user.password;
        console.log('⚠️ Fallback comparison result:', isMatch);
      }
    }
    
    if (!isMatch) {
      console.log('❌ Password does not match');
      console.log('='.repeat(60));
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    console.log('✅ Password verified successfully!');
    
    // Generate JWT token
    const token = 'jwt_' + Date.now(); // Simplified
    
    console.log('\n🎉 LOGIN SUCCESSFUL!');
    console.log('📧 User:', user.email);
    console.log('👤 Name:', user.name);
    console.log('='.repeat(60));
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role || 'user'
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error.message);
    console.log('='.repeat(60));
    
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

// ========================
// DEBUG ENDPOINTS
// ========================

// Debug endpoint to check user data WITH PASSWORD
app.get('/api/debug/user/:email', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: req.params.email });
    
    if (!user) {
      return res.json({ 
        success: false, 
        message: 'User not found',
        email: req.params.email 
      });
    }
    
    // Create response with password info (for debugging only!)
    const response = {
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role || 'user',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        hasPassword: !!user.password,
        passwordLength: user.password ? user.password.length : 0,
        passwordStartsWith: user.password ? user.password.substring(0, 10) : null,
        passwordSample: user.password ? user.password.substring(0, 50) + '...' : null,
        looksLikeBcrypt: user.password ? 
          (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) : false
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Debug endpoint to show ALL user data including passwords (for debugging only!)
app.get('/api/debug/users-full', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    
    const usersWithPasswordInfo = users.map(user => ({
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role || 'user',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0,
      passwordStartsWith: user.password ? user.password.substring(0, 10) : 'NO PASSWORD',
      passwordSample: user.password ? user.password.substring(0, 30) + '...' : null,
      looksLikeBcrypt: user.password ? 
        (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) : false
    }));
    
    res.json({
      success: true,
      count: users.length,
      users: usersWithPasswordInfo
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Debug endpoint - Check database
app.get('/api/debug/database', async (req, res) => {
  try {
    const dbConnected = mongoose.connection.readyState === 1;
    
    if (!dbConnected) {
      return res.json({
        success: false,
        message: 'Database not connected',
        readyState: mongoose.connection.readyState
      });
    }
    
    const db = mongoose.connection.db;
    const databaseName = mongoose.connection.name;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Get user count
    let userCount = 0;
    let users = [];
    
    if (collectionNames.includes('users')) {
      userCount = await db.collection('users').countDocuments();
      users = await db.collection('users').find({}, { 
        projection: { password: 0 } 
      }).limit(10).toArray();
    }
    
    res.json({
      success: true,
      database: {
        name: databaseName,
        connected: true,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        readyState: mongoose.connection.readyState
      },
      collections: collectionNames,
      users: {
        count: userCount,
        sample: users
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Cleanup endpoint - Delete all users (for testing)
app.delete('/api/debug/cleanup-users', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const result = await db.collection('users').deleteMany({});
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} users`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ========================
// ROOT ENDPOINT
// ========================

app.get('/', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  
  res.status(200).json({
    success: true,
    message: '🚀 Rika Jewels E-commerce API',
    version: '1.0.0',
    status: 'Online',
    database: dbConnected ? 'Connected ✅' : 'Disconnected ⚠️',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      debug: {
        database: 'GET /api/debug/database',
        user: 'GET /api/debug/user/:email',
        usersFull: 'GET /api/debug/users-full',
        cleanup: 'DELETE /api/debug/cleanup-users',
        testBcrypt: 'POST /api/debug/test-bcrypt'
      },
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      test: {
        jsonTest: 'POST /api/test/json',
        echo: 'POST /api/echo'
      },
      api: {
        auth: '/api/auth/*',
        products: '/api/products/*',
        users: '/api/users/*',
        orders: '/api/orders/*',
        cart: '/api/cart/*'
      }
    },
    environment: process.env.NODE_ENV || 'development',
    documentation: 'Check README.md for detailed API documentation'
  });
});

// ========================
// ERROR HANDLING MIDDLEWARE
// ========================

// 404 - Route not found
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    suggestion: 'Check available endpoints at GET /',
    availableEndpoints: {
      GET: ['/', '/health', '/api/debug/database', '/api/debug/user/:email', '/api/debug/users-full'],
      POST: [
        '/api/test/json',
        '/api/echo',
        '/api/auth/register',
        '/api/auth/login',
        '/api/debug/test-bcrypt'
      ],
      DELETE: [
        '/api/debug/cleanup-users'
      ]
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Global Error Handler:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      details: err
    } : undefined,
    timestamp: new Date().toISOString()
  });
});

// ========================
// START SERVER
// ========================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 RIKA JEWELS BACKEND SERVER STARTED');
  console.log('='.repeat(60));
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`🌐 Also accessible at: http://127.0.0.1:${PORT}`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Not Connected ❌'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('='.repeat(60));
  
  console.log('\n📋 QUICK TEST ENDPOINTS:');
  console.log('1. Test bcrypt (IMPORTANT!):');
  console.log(`   POST http://localhost:${PORT}/api/debug/test-bcrypt`);
  console.log('   Body: {"password": "test123"}');
  console.log('\n2. Cleanup existing users:');
  console.log(`   DELETE http://localhost:${PORT}/api/debug/cleanup-users`);
  console.log('\n3. Register a new user:');
  console.log(`   POST http://localhost:${PORT}/api/auth/register`);
  console.log('   Body: {"name": "Test", "email": "test@example.com", "password": "123456", "phone": "1234567890"}');
  console.log('\n4. Check saved users:');
  console.log(`   GET http://localhost:${PORT}/api/debug/users-full`);
  console.log('\n5. Login:');
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log('   Body: {"email": "test@example.com", "password": "123456"}');
  console.log('\n' + '='.repeat(60));
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️ Received SIGINT. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      console.log('👋 Server shutdown complete');
      process.exit(0);
    });
  });
});

process.on('SIGTERM', () => {
  console.log('\n⚠️ Received SIGTERM. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      console.log('👋 Server shutdown complete');
      process.exit(0);
    });
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('🔥 Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
  server.close(() => {
    process.exit(1);
  });
});

export default app;