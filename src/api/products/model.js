const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  image: {
    type: String,
    required: [true, 'Image field is required'],
  },
  category: {
    type: String,
    required: [true, 'Category field is required'],
  },
  unit: {
    type: String,
    required: [true, 'Unit field is required'],
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling Price field is required'],
  },
  capitalPrice: {
    type: Number,
    required: [true, 'Capital Price field is required'],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Products', schema);