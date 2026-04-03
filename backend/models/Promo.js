import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Promo = mongoose.models.Promo || mongoose.model('Promo', promoSchema);
export default Promo;
