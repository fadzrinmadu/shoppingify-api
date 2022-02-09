const ordersService = require('./service');

exports.postOrdersHandler = async (request, response, next) => {
  try {
    const payload = request.body;

    await ordersService.addOrder(payload);

    return response.status(201).end();
  } catch (error) {
    return next(error);
  }
};

exports.getOrdersHandler = async (request, response, next) => {
  try {
    const orders = await ordersService.getOrders();

    return response.status(200).json({
      status: 'success',
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOrderByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    
    const order = await ordersService.getOrderById(id);

    return response.status(200).json({
      status: 'success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    await ordersService.deleteOrderById(id);

    return response.status(200).end();
  } catch (error) {
    next(error);
  }
};