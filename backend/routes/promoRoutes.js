import express from 'express';
import { getPromos, addPromo, deletePromo, togglePromo } from '../controllers/promoController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', getPromos);
router.post('/', protect, admin, addPromo);
router.delete('/:id', protect, admin, deletePromo);
router.put('/:id/toggle', protect, admin, togglePromo);

export default router;
