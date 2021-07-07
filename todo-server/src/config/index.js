const Joi = require('joi');
const { config } = require('dotenv');

config();

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .trim()
      .default('development')
      .valid('development', 'production', 'test'),
    SERVER_PORT: Joi.string()
      .trim()
      .default('5000'),
    SERVER_URL: Joi.string()
      .trim()
      .default('http://localhost:5000'),
    CLIENT_URL: Joi.string()
      .trim()
      .default('http://localhost:3000'),
    DB_URL: Joi.string()
      .trim()
      .default('mongodb://localhost/todo-tests'),
  })
  .unknown(true);

const { error, value } = schema.validate(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error(`Missing property in config file: ${error.message}`);
  process.exit(1);
}

module.exports = value;
