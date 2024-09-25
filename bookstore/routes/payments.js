const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// add payment
router.post('/', paymentController.addPayment);

// get all payments
router.get('/', paymentController.getAllPayments);

// get a payment by id
router.get('/:id', paymentController.getAPayment);

// update payment
router.put('/:id', paymentController.updatePayment);

// delete payment
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
