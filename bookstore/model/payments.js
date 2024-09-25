const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;