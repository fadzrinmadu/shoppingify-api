const mongoose = require('mongoose');

const schema = mongoose.Schema({
  items: [{
    _id: mongoose.Types.ObjectId,
    name: String,
    category: String,
    image: String,
    amount: Number,
    sellingPrice: Number,
    capitalPrice: Number,
    stock: Number,
  }],
  subTotal: Number,
  discount: {
    value: {
      type: Number,
    },
    type: {
      type: String,
    },
    total: {
      type: Number,
    },
  },
  grandTotal: Number,
  cash: Number,
  status: String,
  createdAt: Date,
});

module.exports = mongoose.model('Orders', schema);