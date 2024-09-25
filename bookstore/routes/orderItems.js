const express = require('express');
const orderItemController = require('../controllers/orderItemController');
const router = express.Router();

//add orderItem
router.post('/', orderItemController.addOrderItem);

//get all orderItems
router.get('/', orderItemController.getAllOrderItems);

// get a orderItem by id
router.get('/:id', orderItemController.getAnOrderItem);

// update orderItem
router.put('/:id', orderItemController.updateOrderItem);

// delete orderItem
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;