const mongoose = require('mongoose');
const config = require('../config');

const { DB_URL } = config;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
  process.exit(1);
});

module.exports = db;
