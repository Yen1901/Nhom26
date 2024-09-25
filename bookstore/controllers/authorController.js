const { response } = require("express");
const Author = require("../model/authors");
const Book = require("../model/books")

const authorController = {
    //add author
    addAuthor: async(req, res) => {
        try {
            const newAuthor = new Author(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get all authors
    getAllAuthors: async (req, res) => {
        try {
            const authors = await Author.find().populate('books');
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get an author by id
    getAnAuthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate('books');
            res.status(200).json(author);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update author
    updateAuthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (!author) {
                return res.status(404).json("Author not found");
            }
            await author.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete author
    deleteAuthor: async (req, res) => {
        try {
            await Book.updateMany({ author: req.params.id }, { author: null });
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

};

module.exports = authorController;