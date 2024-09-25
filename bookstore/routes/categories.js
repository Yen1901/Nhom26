const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// add category
router.post('/', categoryController.addCategory);

// get all categories
router.get('/', categoryController.getAllCategories);

// get a category by id
router.get('/:id', categoryController.getAnCategory);

// update category
router.put('/:id', categoryController.updateCategory);

// delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
