import mongoose from 'mongoose';
import udharConnection from '../config/udharDb.js';

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['credit', 'payment'], // credit: customer takes item on debt, payment: customer pays back
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const udariSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    transactions: [transactionSchema],
    totalBalance: {
        type: Number,
        default: 0
    },
    notes: String
}, { timestamps: true });

// Pre-save middleware to update totalBalance
udariSchema.pre('save', function (next) {
    this.totalBalance = this.transactions.reduce((acc, curr) => {
        if (curr.type === 'credit') {
            return acc + curr.amount;
        } else {
            return acc - curr.amount;
        }
    }, 0);
    next();
});

const Udari = udharConnection.model('Udari', udariSchema);

export default Udari;
