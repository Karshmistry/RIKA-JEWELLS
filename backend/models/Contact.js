import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['contact', 'appointment'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // Optional for appointments which might only take phone
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String, // General inquiry, Order status, etc.
  },
  message: {
    type: String,
  },
  preferredContact: {
    type: String, // email, phone, whatsapp
    default: 'email',
  },
  storeLocation: {
    type: String, // For appointments
  },
  appointmentDate: {
    type: Date, // For appointments
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'cancelled'],
    default: 'new',
  }
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
