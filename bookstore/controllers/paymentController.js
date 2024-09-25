const { response } = require("express");
const Payment = require("../model/payments");
const Order = require("../model/orders");

const paymentController = {
    // add payment
    addPayment: async (req, res) => {
        try {
            const newPayment = new Payment(req.body);
            const savedPayment = await newPayment.save();
            res.status(200).json(savedPayment);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get all payments
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.find().populate('orders');
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get a payment by id
    getAPayment: async (req, res) => {
        try {
            const payment = await Payment.findById(req.params.id).populate('orders');
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update payment
    updatePayment: async (req, res) => {
        try {
            const payment = await Payment.findById(req.params.id);
            if (!payment) {
                return res.status(404).json("Payment not found");
            }
            await payment.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete payment
    deletePayment: async (req, res) => {
        try {
            await Order.updateMany({ payment: req.params.id }, { payment: null });
            await Payment.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = paymentController;
