const Order = require('../orders/model');
const ClientError = require('../../exceptions/ClientError');

const MONTHS_ARRAY = [
  '', 'January', 'February', 'March', 
  'April', 'May', 'June', 
  'July', 'August', 'September', 
  'October', 'November', 'December',
];

exports.getStatisticsByDate = async (startDate, endDate) => {
  if (startDate === '' && endDate === '') {
    throw new ClientError('Please ensure you pick two dates');
  }

  const topItems = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $unwind: {
        path: '$items',
      },
    },
    {
      $group: {
        _id: '$items._id',
        name: { $first: '$items.name' },
        value: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $limit: 3,
    },
  ]);

  const topCategories = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $unwind: {
        path: '$items',
      },
    },
    {
      $group: {
        _id: '$items._id',
        category: { $first: '$items.category' },
        value: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $limit: 3,
    },
  ]);

  const orders = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        value: { $sum: 1 },
        revenue: { $sum: '$grandTotal' },
      },
    },
    {
      $project: {
        _id: 0,
        label: { $arrayElemAt: [MONTHS_ARRAY, "$_id.month"] },
        value: 1,
        revenue: 1,
      },
    },
    {
      $limit: 6,
    },
  ]);
 
  return {
    topItems,
    topCategories,
    orders,
  };
};