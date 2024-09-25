const { response } = require("express");
const Order = require("../model/orders");
const OrderItem = require("../model/orderItems");
const Payment = require("../model/payments");
const User = require("../model/users");

const orderController = {
    // add order
    addOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save();

            if (req.body.user) {
                await User.findByIdAndUpdate(req.body.user, {
                    $push: { orders: savedOrder._id }
                });
            }

            if (req.body.payment) {
                await Payment.findByIdAndUpdate(req.body.payment, {
                    $push: { orders: savedOrder._id }
                });
            }

            res.status(200).json(savedOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get all orders
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('user').populate('payment');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get an order by ID
    getAnOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate('user').populate('payment');
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update order
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json('Order not found');
            }
            await order.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete order
    deleteOrder: async (req, res) => {
        try {
            await OrderItem.updateMany(
                {order: req.params.id},
                {order: null}
            )
            await Payment.updateMany(
                { orders: req.params.id},
                { $pull: {orders: req.params.id}}
            );
            await User.updateMany(
                { orders: req.params.id},
                { $pull: {orders: req.params.id}}
            );
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
        
    }
};

module.exports = orderController;


