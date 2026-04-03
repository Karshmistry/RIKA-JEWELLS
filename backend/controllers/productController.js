import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: 'Sample Name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample Brand',
            category: 'Sample Category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            image,
            brand,
            category,
            countInStock,
            originalPrice,
            discount,
            inStock,
            isNew,
            isBestseller,
            isPure,
            isHallmark,
            isTraditional,
            purity,
            type,
            weight,
            material,
            jewelleryType,
            occasion,
            gemstone,
            delivery
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price !== undefined ? price : product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

            // New fields update
            product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
            product.discount = discount !== undefined ? discount : product.discount;
            product.inStock = inStock !== undefined ? inStock : product.inStock;
            product.isNew = isNew !== undefined ? isNew : product.isNew;
            product.isBestseller = isBestseller !== undefined ? isBestseller : product.isBestseller;
            product.isPure = isPure !== undefined ? isPure : product.isPure;
            product.isHallmark = isHallmark !== undefined ? isHallmark : product.isHallmark;
            product.isTraditional = isTraditional !== undefined ? isTraditional : product.isTraditional;
            product.purity = purity || product.purity;
            product.type = type || product.type;
            product.weight = weight || product.weight;
            product.material = material || product.material;
            product.jewelleryType = jewelleryType || product.jewelleryType;
            product.occasion = occasion || product.occasion;
            product.gemstone = gemstone || product.gemstone;
            product.delivery = delivery || product.delivery;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
