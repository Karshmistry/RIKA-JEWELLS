// // // // import express from "express";
// // // // import { signup, login } from "../controllers/authController.js";

// // // // const router = express.Router();

// // // // router.post("/signup", signup);
// // // // router.post("/login", login);

// // // // export default router;


// // // import express from "express";
// // // import { signup, login } from "../controllers/authController.js";

// // // const router = express.Router();

// // // router.post("/signup", signup);
// // // router.post("/login", login);

// // // export default router;


// // // import express from 'express';
// // // import { register, login, getMe } from '../controllers/authController.js';
// // // import { protect } from '../middleware/auth.js';

// // // const router = express.Router();

// // // router.post('/register', register);
// // // router.post('/login', login);
// // // router.get('/me', protect, getMe);

// // // export default router;



// // import express from 'express';
// // import { register, login, getMe, logout } from '../controllers/authController.js';
// // import { protect } from '../middleware/auth.js';

// // const router = express.Router();

// // // Public routes
// // router.post('/register', register);
// // router.post('/login', login);

// // // Protected routes
// // router.get('/me', protect, getMe);
// // router.get('/logout', protect, logout);

// // export default router;




// export const protect = async (req, res, next) => {
//   try {
//     // Simple auth middleware
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }
    
//     // For now, just set a mock user
//     req.user = {
//       id: 'mock_user_id',
//       email: 'test@test.com',
//       role: 'user'
//     };
    
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized'
//     });
//   }
// };


import express from 'express';
import { register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

export default router;