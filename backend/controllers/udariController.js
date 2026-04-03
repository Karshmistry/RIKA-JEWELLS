import Udari from '../models/Udari.js';

// @desc    Get all Udari records
// @route   GET /api/udari
// @access  Private/Admin
export const getUdariRecords = async (req, res) => {
    try {
        const udariRecords = await Udari.find({}).sort({ updatedAt: -1 });
        res.json(udariRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single Udari record
// @route   GET /api/udari/:id
// @access  Private/Admin
export const getUdariById = async (req, res) => {
    try {
        const udari = await Udari.findById(req.params.id);
        if (udari) {
            res.json(udari);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new Udari record (customer)
// @route   POST /api/udari
// @access  Private/Admin
export const createUdariRecord = async (req, res) => {
    try {
        const { customerName, customerPhone, notes, transactions } = req.body;

        const udari = new Udari({
            customerName,
            customerPhone,
            notes,
            transactions: transactions || []
        });

        const createdUdari = await udari.save();
        res.status(201).json(createdUdari);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add transaction to Udari record
// @route   POST /api/udari/:id/transactions
// @access  Private/Admin
export const addUdariTransaction = async (req, res) => {
    try {
        const { type, amount, description, date } = req.body;
        const udari = await Udari.findById(req.params.id);

        if (udari) {
            const transaction = {
                type,
                amount,
                description,
                date: date || Date.now()
            };

            udari.transactions.push(transaction);
            const updatedUdari = await udari.save();
            res.status(201).json(updatedUdari);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Udari record
// @route   DELETE /api/udari/:id
// @access  Private/Admin
export const deleteUdariRecord = async (req, res) => {
    try {
        const udari = await Udari.findById(req.params.id);

        if (udari) {
            await udari.deleteOne();
            res.json({ message: 'Record removed' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Udari record info
// @route   PUT /api/udari/:id
// @access  Private/Admin
export const updateUdariRecord = async (req, res) => {
    try {
        const { customerName, customerPhone, notes } = req.body;
        const udari = await Udari.findById(req.params.id);

        if (udari) {
            udari.customerName = customerName || udari.customerName;
            udari.customerPhone = customerPhone || udari.customerPhone;
            udari.notes = notes !== undefined ? notes : udari.notes;

            const updatedUdari = await udari.save();
            res.json(updatedUdari);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
