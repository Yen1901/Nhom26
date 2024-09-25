const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalPrice: { type: Number, required: true, min: 0 },
    shippingAddress: { type: String, required: true },
    orderStatus: { type: String, required: true, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
