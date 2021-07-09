const Joi = require('joi');
const { dbIdRegExp } = require('../regexps');
const { idMessages } = require('../validation/messages/dbID');

const validateDbId = (id = '', messages = idMessages) => {
  const schema = Joi.string()
    .trim()
    .regex(dbIdRegExp)
    .messages(messages)
    .required();

  const { error: validationError, value: data } = schema.validate(id);

  return { validationError, data };
};

module.exports = {
  validateDbId,
};
