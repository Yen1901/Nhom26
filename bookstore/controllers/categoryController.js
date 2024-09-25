const { response } = require("express");
const Category = require("../model/categories")
const Book = require("../model/books")

const categoryController = {
    //add category
    addCategory: async(req, res) => {
        try {
            const newCategory = new Category(req.body);
            const saveCategory = await newCategory.save();
            res.status(200).json(saveCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find().populate('books');
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get an category by id
    getAnCategory: async(req, res) => {
        try {
            const category = await Category.findById(req.params.id).populate('books');
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update category
    updateCategory: async(req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json("Category not found");
            }
            await category.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete category
    deleteCategory: async (req, res) => {
        try {
            await Book.updateMany({ category: req.params.id }, { category: null });
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

};

module.exports = categoryController;