 
// export const register = async (req, res) => {
//   try {
//     console.log('🎯 Register endpoint called');
    
//     const { name, email, password, phone } = req.body;
    
//     // Basic validation
//     if (!name || !email || !password || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required'
//       });
//     }
    
//     // For now, return mock response
//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       user: {
//         id: 'temp_' + Date.now(),
//         name,
//         email,
//         phone,
//         role: 'user'
//       },
//       token: 'temp_token_' + Date.now()
//     });
    
//   } catch (error) {
//     console.error('❌ Register error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password required'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token: 'temp_token_' + Date.now(),
//       user: {
//         id: 'temp_user_id',
//         email,
//         name: 'Test User'
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const getMe = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       user: {
//         id: req.user?.id || 'temp_id',
//         name: 'Test User',
//         email: 'test@test.com'
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};