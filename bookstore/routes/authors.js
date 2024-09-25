const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

// add author
router.post('/', authorController.addAuthor);

// get all authors
router.get('/', authorController.getAllAuthors);

// get an author by id
router.get('/:id', authorController.getAnAuthor);

// update author
router.put('/:id', authorController.updateAuthor);

// delete author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
