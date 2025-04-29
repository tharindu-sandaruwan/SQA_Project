const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
  accessoryName: {
    type: String,
    required: true,
    trim: true
  },
  accessoryType: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  phoneModel: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  compatibleModels: {
    type: [String],
    default: [],
    validate: {
      validator: function(models) {
        return Array.isArray(models);
      },
      message: 'Compatible models must be an array of strings'
    }
  },
  accessoryDescription: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Accessory', accessorySchema);