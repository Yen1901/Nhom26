const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

//add order
router.post('/', orderController.addOrder);

//get all orders
router.get('/', orderController.getAllOrders);

// get an order by id
router.get('/:id', orderController.getAnOrder);

// update order
router.put('/:id', orderController.updateOrder);

// delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

