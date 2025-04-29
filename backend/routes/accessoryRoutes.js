const express = require('express');
const router = express.Router();
const accessoryController = require('../controllers/accessoryController');

// Create a new accessory
router.post('/', accessoryController.createAccessory);

// Get all accessories
router.get('/', accessoryController.getAllAccessories);

// Get accessory by ID
router.get('/:id', accessoryController.getAccessoryById);

// Update accessory
router.put('/:id', accessoryController.updateAccessory);

// Delete accessory
router.delete('/:id', accessoryController.deleteAccessory);


module.exports = router;