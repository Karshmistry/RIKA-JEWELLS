import express from 'express';
import { getBanners, getAdminBanners, addBanner, deleteBanner, toggleBanner } from '../controllers/bannerController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', getBanners);
router.get('/admin', protect, admin, getAdminBanners);
router.post('/', protect, admin, addBanner);
router.delete('/:id', protect, admin, deleteBanner);
router.put('/:id/toggle', protect, admin, toggleBanner);

export default router;
