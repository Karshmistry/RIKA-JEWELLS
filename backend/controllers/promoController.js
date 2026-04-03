import Promo from '../models/Promo.js';

// @desc    Get all promos
// @route   GET /api/promos
// @access  Public
export const getPromos = async (req, res) => {
    try {
        const promos = await Promo.find({});
        res.json(promos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a promo
// @route   POST /api/promos
// @access  Private/Admin
export const addPromo = async (req, res) => {
    try {
        const { text } = req.body;
        const promo = new Promo({ text });
        const createdPromo = await promo.save();
        res.status(201).json(createdPromo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a promo
// @route   DELETE /api/promos/:id
// @access  Private/Admin
export const deletePromo = async (req, res) => {
    try {
        const promo = await Promo.findById(req.params.id);
        if (promo) {
            await Promo.deleteOne({ _id: req.params.id });
            res.json({ message: 'Promo removed' });
        } else {
            res.status(404).json({ message: 'Promo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle promo status
// @route   PUT /api/promos/:id/toggle
// @access  Private/Admin
export const togglePromo = async (req, res) => {
    try {
        const promo = await Promo.findById(req.params.id);
        if (promo) {
            promo.isActive = !promo.isActive;
            const updatedPromo = await promo.save();
            res.json(updatedPromo);
        } else {
            res.status(404).json({ message: 'Promo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
