import express from 'express';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, getAllUsers);

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();
        const productCount = await Product.countDocuments();

        const orders = await Order.find({});
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        res.json({
            userCount,
            orderCount,
            productCount,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
