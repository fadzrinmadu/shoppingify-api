require('dotenv').config();

const express = require('express');
const database = require('./database');
const ClientError = require('./exceptions/ClientError');
const productsRouter =  require('./api/products/router');
const ordersRouter =  require('./api/orders/router');
const statisticsRouter = require('./api/statistics/router');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/statistics', statisticsRouter);

database.on('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

database.on('error', (error) => {
  console.log(`Cannot connect to mongodb: ${error}`);
});

app.use((error, request, response, next) => {
  if (error instanceof ClientError) {
    return response.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }

  if (error.name === 'ValidationError') {
    const messages = [];

    Object.values(error.errors).forEach(({ properties }) => {
      messages.push({
        field: properties.path,
        message: properties.message,
      });
    });

    return response.status(400).json({
      status: 'fail',
      messages,
    });
  }

  // SERVER ERROR
  console.log(error);
  response.status(500);
  return next();
});