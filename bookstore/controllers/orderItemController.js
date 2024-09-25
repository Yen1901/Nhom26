const { response } = require("express");
const Order = require("../model/orders");
const OrderItem = require("../model/orderItems");
const Book = require("../model/books");

const orderItemController = {
    // add order item
    addOrderItem: async (req, res) => {
        try {
            const newOrderItem = new OrderItem(req.body);
            const savedOrderItem = await newOrderItem.save();

            // Update the order's orderItems array
            if (req.body.order) {
                await Order.findByIdAndUpdate(req.body.order, {
                    $push: { orderItems: savedOrderItem._id }
                });
            }

            // Decrease book stock based on order item quantity
            if (req.body.book) {
                await Book.findByIdAndUpdate(req.body.book, {
                    $inc: { stock: -req.body.quantity }
                });
            }

            res.status(200).json(savedOrderItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get all order items
    getAllOrderItems: async (req, res) => {
        try {
            const orderItems = await OrderItem.find().populate('order').populate('book');
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get an order item by id
    getAnOrderItem: async (req, res) => {
        try {
            const orderItem = await OrderItem.findById(req.params.id).populate('order').populate('book');
            res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update order item
    updateOrderItem: async (req, res) => {
        try {
            const orderItem = await OrderItem.findById(req.params.id);
            if (!orderItem) {
                return res.status(404).json("Order item not found");
            }
            await orderItem.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete order item
    deleteOrderItem: async (req, res) => {
        try {
            await Order.updateMany({ orderItems: req.params.id }, { $pull: { orderItems: req.params.id } });
            await Book.updateMany({ orderItems: req.params.id }, { $inc: { stock: +req.body.quantity } });

            await OrderItem.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = orderItemController;
