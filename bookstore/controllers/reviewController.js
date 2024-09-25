const { response } = require("express");
const Review = require("../model/reviews");
const Book = require("../model/books");
const User = require("../model/users");

const reviewController = {
    // add review
    addReview: async (req, res) => {
        try {
            const newReview = new Review(req.body);
            const savedReview = await newReview.save();

            // Update the book's reviews array
            if (req.body.book) {
                await Book.findByIdAndUpdate(req.body.book, {
                    $push: { reviews: savedReview._id }
                });
            }

            // Update the user's reviews array
            if (req.body.user) {
                await User.findByIdAndUpdate(req.body.user, {
                    $push: { reviews: savedReview._id }
                });
            }

            res.status(200).json(savedReview);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get all reviews
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find().populate('book').populate('user');
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get a review by id
    getAReview: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id).populate('book').populate('user');
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update review
    updateReview: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) {
                return res.status(404).json("Review not found");
            }
            await review.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete review
    deleteReview: async (req, res) => {
        try {
            await Book.updateMany({ reviews: req.params.id }, { $pull: {reviews: req.params.id}});
            await User.updateMany({ reviews: req.params.id }, { $pull: {reviews: req.params.id}});

            await Review.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = reviewController;
