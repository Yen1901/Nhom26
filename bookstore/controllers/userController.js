const { response } = require("express");
const User = require("../model/users");
const Review = require("../model/reviews");
const Order = require("../model/orders")

const userController = {
    //add user
    addUser: async(req, res) => {
        try {
            const newUser = new User(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //get a user by id
    getAUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //update user
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json("User not found");
            }
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //delete user
    deleteUser: async (req, res) => {
        try {
            await Review.updateMany({ user: req.params.id }, { user: null});
            await Order.updateMany({ user: req.params.id }, { user: null});
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController;