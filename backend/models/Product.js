import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    // New fields for frontend compatibility
    originalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    isNew: { type: Boolean, default: true },
    isBestseller: { type: Boolean, default: false },
    isPure: { type: Boolean, default: false },
    isHallmark: { type: Boolean, default: false },
    isTraditional: { type: Boolean, default: false },
    purity: { type: String, default: '' },
    type: { type: String, default: '' },
    weight: { type: String, default: '' },
    material: { type: String, default: '' },
    jewelleryType: { type: String, default: '' },
    occasion: { type: String, default: '' },
    gemstone: { type: String, default: '' },
    delivery: { type: String, default: '5-7 days' },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
