const express = require('express');
const userController = require('../controllers/userController');  // Import the controller
const router = express.Router();

// add user
router.post("/", userController.addUser);

// get all users
router.get("/", userController.getAllUsers);

// get a user by id
router.get("/:id", userController.getAUser);

// update user
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
