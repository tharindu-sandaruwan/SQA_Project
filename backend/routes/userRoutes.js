const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get all users (for testing)
router.get('/', userController.getAllUsers);

module.exports = router;