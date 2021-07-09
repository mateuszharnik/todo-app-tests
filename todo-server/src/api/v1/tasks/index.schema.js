const Joi = require('joi');
const { dbIdRegExp } = require('../../../helpers/regexps');
const { boardIdMessages } = require('../../../helpers/validation/messages/boardID');
const { titleMessages } = require('../../../helpers/validation/messages/title');
const {
  descriptionMessages,
} = require('../../../helpers/validation/messages/description');
const {
  userIdMessages,
} = require('../../../helpers/validation/messages/userID');

const validateTask = (task = {}) => {
  const schema = Joi.object().keys({
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
    board_id: Joi.string()
      .trim()
      .regex(dbIdRegExp)
      .messages(boardIdMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(task);

  return { validationError, data };
};

module.exports = {
  validateTask,
};
