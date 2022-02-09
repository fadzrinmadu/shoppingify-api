const mongoose = require('mongoose');
const Order = require('./model');
const NotFoundError = require('../../exceptions/NotFoundError');

const checkOrderById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`Order with id '${id}' not found`);
  }

  const order = await Order.exists({ _id: id });

  if (!order) {
    throw new NotFoundError(`Order with id '${id}' not found`);
  }
};


exports.addOrder = async (payload) => {
  let grandTotal = 0;
  let discount = 0;
  
  const subTotal = payload.items
    .reduce((total, item) => total + (item.amount * item.sellingPrice), 0);
  
  if (payload.discount.type === 'percentage') {
    discount += subTotal * (payload.discount.value / 100);
  } else {
    discount += subTotal - payload.discount.value;
  }

  grandTotal += subTotal - discount;

  const order = new Order({
    items: payload.items,
    subTotal,
    discount: {
      value: payload.discount.value,
      type: payload.discount.type,
      total: discount,
    },
    grandTotal,
    cash: payload.cash,
    status: 'paid',
    createdAt: new Date().toISOString(),
  });

  await order.save();
};

exports.getOrders = async () => {
  const orders = await Order.find().select('_id grandTotal status createdAt');
  return orders;
};

exports.getOrderById = async (id) => {
  await checkOrderById(id);
  const order = await Order.findOne({ _id: id });
  return order;
};

exports.deleteOrderById = async (id) => {
  await checkOrderById(id);

  const order = await Order.findOne({ _id: id });
  order.status = 'refunded';

  await order.save();
}