const { response } = require("express");
const Author = require("../model/authors")
const Category = require("../model/categories");
const Book = require("../model/books");
const Review = require("../model/reviews");
const OrderItem = require("../model/orderItems");

const bookController = {
    // add book
    addBook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const saveBook = await newBook.save();

            // Update the author's books array
            if (req.body.author) {
                await Author.findByIdAndUpdate(req.body.author, {
                    $push: { books: saveBook._id }
                });
            }

            // Update the category's books array
            if (req.body.category) {
                await Category.findByIdAndUpdate(req.body.category, {
                    $push: { books: saveBook._id }
                });
            }

            res.status(200).json(saveBook);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //get all books
    getAllBooks: async(req, res) => {
        try {
            const books = await Book.find().populate('author').populate('category');
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get an book by id
    getAnBook: async(req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author').populate('category');
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update book
    updateBook: async(req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json("Book not found");
            }
            await book.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //delete book
    deleteBook: async(req, res) => {
        try {
            await Review.updateMany(
                {book: req.params.id},
                {book: null},
            );
            await OrderItem.updateMany(
                {book: req.params.id},
                {book: null},
            )
            await Category.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } }
            );
            await Author.updateMany(
                {books: req.params.id}, 
                {$pull: {books: req.params.id}}
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = bookController;