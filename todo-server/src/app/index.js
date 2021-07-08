const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('../config');
const api = require('../api');
const { notFound, errorHandler } = require('../middlewares/errors');
const { checkToken } = require('../middlewares/auth');

const { CLIENT_URL } = config;

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(checkToken);

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
