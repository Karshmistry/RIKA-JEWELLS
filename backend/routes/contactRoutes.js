import express from 'express';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// @desc    Create a new contact message or appointment
// @route   POST /api/contacts
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { 
      type, name, email, phone, subject, message, preferredContact, 
      storeLocation, appointmentDate 
    } = req.body;

    const contact = new Contact({
      type,
      name,
      email,
      phone,
      subject,
      message,
      preferredContact,
      storeLocation,
      appointmentDate
    });

    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all contacts and appointments
// @route   GET /api/contacts
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (contact) {
      contact.status = req.body.status || contact.status;
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact/Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
