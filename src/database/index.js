const mongoose = require('mongoose');

const uri = process.env.STAGE !== 'dev' ? process.env.DB_URI : process.env.DB_URI_TEST;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options);

module.exports = mongoose.connection;