const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('../config');
const v1 = require('../api/v1');
const { notFound, errorHandler } = require('../middlewares/errors');

const { CLIENT_URL } = config;

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));

app.use('/api/v1', v1);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
