const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }
}, { timestamps: true });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
