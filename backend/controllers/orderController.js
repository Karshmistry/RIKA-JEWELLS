import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount: bodyTotal } = req.body;

    console.log('📦 Creating order for user:', req.user._id);

    // Calculate total amount and check stock
    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`
        });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.countInStock}`
        });
      }

      calculatedTotal += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: product.price,
        customization: item.customization || {}
      });
    }

    const generatedOrderId = req.body.orderId || `RIKA${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const finalTotal = bodyTotal || calculatedTotal;

    console.log('🎫 Using Order ID:', generatedOrderId);

    // Create order using new Order syntax for more control
    const order = new Order({
      orderId: generatedOrderId,
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      payment: {
        method: paymentMethod || 'COD',
        status: paymentMethod === 'COD' ? 'pending' : 'paid'
      },
      totalAmount: finalTotal,
      orderStatus: 'Processing'
    });

    console.log('📝 Order Object Prepared:', {
      orderId: order.orderId,
      user: order.user,
      itemCount: order.items.length,
      total: order.totalAmount
    });

    console.log('💾 Saving order to database...');
    await order.save();

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.quantity }
      });
    }

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('❌ Order Creation Error:', error);
    res.status(500).json({
      success: false,
      message: "DEBUG_CREATE_ORDER: " + (error.errors ? JSON.stringify(error.errors) : error.message)
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name image');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort('-createdAt');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a razorpay order
// @route   POST /api/orders/razorpay/create
// @access  Private
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Check if razorpay is installed dynamically
    let Razorpay;
    try {
      const razorpayModule = await import('razorpay');
      Razorpay = razorpayModule.default;
    } catch (err) {
      return res.status(500).json({ 
        success: false, 
        message: "Razorpay package is missing! Please run 'npm install razorpay' in your backend directory." 
      });
    }

    // Check if real keys are provided
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'your_key_id') {
      return res.status(500).json({ 
        success: false, 
        message: "Razorpay keys are missing! Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your backend .env file from your Razorpay Dashboard."
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: "INR",
      receipt: `rica_rcpt_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ success: false, message: "Error creating Razorpay order" });
    }

    res.status(200).json({ 
        success: true, 
        order,
        key_id: keyId
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.description || error.message || "Failed to communicate with Razorpay. Check your API keys." 
    });
  }
};