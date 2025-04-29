const Accessory = require('../models/Accessories');

// Create a new accessory
exports.createAccessory = async (req, res) => {
  try {
    const { 
      accessoryName, 
      accessoryType, 
      price, 
      phoneModel, 
      brand, 
      compatibleModels, 
      accessoryDescription,
      //accessoryImage 
    } = req.body;
    
    // Basic validation
    if (!accessoryName || !accessoryType || !price || !phoneModel || !brand) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const processedCompatibleModels = Array.isArray(compatibleModels) 
    ? compatibleModels 
    : (compatibleModels ? [compatibleModels] : []);


    const newAccessory = new Accessory({
      accessoryName,
      accessoryType,
      price,
      phoneModel,
      brand,
      compatibleModels: compatibleModels || [],
      accessoryDescription: accessoryDescription || ''
      //accessoryImage: accessoryImage || null
    });

    const savedAccessory = await newAccessory.save();
    res.status(201).json(savedAccessory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all accessories
exports.getAllAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get accessory by ID
exports.getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }
    res.json(accessory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update accessory
exports.updateAccessory = async (req, res) => {
  try {
    const { 
      accessoryName, 
      accessoryType, 
      price, 
      phoneModel, 
      brand, 
      compatibleModels, 
      accessoryDescription,
      //accessoryImage 
    } = req.body;
    
    const updatedAccessory = await Accessory.findByIdAndUpdate(
      req.params.id,
      {
        accessoryName,
        accessoryType,
        price,
        phoneModel,
        brand,
        compatibleModels,
        accessoryDescription,
        //accessoryImage
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedAccessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }
    
    res.json(updatedAccessory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete accessory
exports.deleteAccessory = async (req, res) => {
  try {
    const deletedAccessory = await Accessory.findByIdAndDelete(req.params.id);
    
    if (!deletedAccessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }
    
    res.json({ message: 'Accessory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get accessories by brand
exports.getAccessoriesByBrand = async (req, res) => {
  try {
    const accessories = await Accessory.find({ brand: req.params.brand });
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get accessories by type
exports.getAccessoriesByType = async (req, res) => {
  try {
    const accessories = await Accessory.find({ accessoryType: req.params.type });
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get accessories compatible with a specific phone model
exports.getCompatibleAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find({ 
      compatibleModels: { $in: [req.params.model] }
    });
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};