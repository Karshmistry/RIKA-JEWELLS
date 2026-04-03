import express from 'express';
import {
    getUdariRecords,
    getUdariById,
    createUdariRecord,
    addUdariTransaction,
    deleteUdariRecord,
    updateUdariRecord
} from '../controllers/udariController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getUdariRecords)
    .post(protect, admin, createUdariRecord);

router.route('/:id')
    .get(protect, admin, getUdariById)
    .put(protect, admin, updateUdariRecord)
    .delete(protect, admin, deleteUdariRecord);

router.route('/:id/transactions')
    .post(protect, admin, addUdariTransaction);

export default router;
