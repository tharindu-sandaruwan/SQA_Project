const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, mobileNumber } = req.body;
    
    // Basic validation
    if (!username || !email || !password || !mobileNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({
      username,
      email,
      password, // Note: In production, you should hash the password before saving
      mobileNumber
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users (for testing)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};