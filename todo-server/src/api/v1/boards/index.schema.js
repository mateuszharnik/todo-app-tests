const Joi = require('joi');
const { dbIdRegExp } = require('../../../helpers/regexps');
const { unknownMessages } = require('../../../helpers/validation/messages/unknown');
const { descriptionMessages } = require('../../../helpers/validation/messages/description');
const { titleMessages } = require('../../../helpers/validation/messages/title');
const { userIdMessages } = require('../../../helpers/validation/messages/userID');

const validateBoard = (board = {}) => {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .trim()
        .min(1)
        .max(512)
        .messages(titleMessages)
        .required(),
      description: Joi.string()
        .trim()
        .max(10000)
        .allow('')
        .messages(descriptionMessages)
        .required(),
      user_id: Joi.string()
        .trim()
        .regex(dbIdRegExp)
        .messages(userIdMessages)
        .required(),
    })
    .unknown(false)
    .messages(unknownMessages);

  const { error: validationError, value: data } = schema.validate(board);

  return { validationError, data };
};

module.exports = {
  validateBoard,
};
