const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

//add review
router.post('/', reviewController.addReview);

//get all reviews
router.get('/', reviewController.getAllReviews);

// get a review by id
router.get('/:id', reviewController.getAReview);

// update review
router.put('/:id', reviewController.updateReview);

// delete review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;