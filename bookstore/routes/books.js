const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

//add book
router.post('/', bookController.addBook);

//get all books
router.get('/', bookController.getAllBooks);

// get a book by id
router.get('/:id', bookController.getAnBook);

// update book
router.put('/:id', bookController.updateBook);

// delete book
router.delete('/:id', bookController.deleteBook);

module.exports = router;

