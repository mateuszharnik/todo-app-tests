const Joi = require('joi');
const { avaratBufferMessages } = require('../../../helpers/validation/messages/avatarBuffer');
const { avaratSizeMessages } = require('../../../helpers/validation/messages/avatarSize');
const { mimetypeMessages } = require('../../../helpers/validation/messages/mimetype');
const { emailMessages } = require('../../../helpers/validation/messages/email');
const {
  emailRegExp,
  passwordRegExp,
  mimetypeRegExp,
} = require('../../../helpers/regexps');
const {
  createUsernameMessages,
  createPasswordMessages,
  passwordMessages,
  confirmPasswordMessages,
} = require('../../../helpers/validation/messages');

const validateEmail = (email = {}) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .lowercase()
      .messages(emailMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(email);

  return { validationError, data };
};

const validateAvatar = (avatar = {}) => {
  const schema = Joi.object().keys({
    mimetype: Joi.string()
      .trim()
      .regex(mimetypeRegExp)
      .lowercase()
      .messages(mimetypeMessages)
      .required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .messages(avaratSizeMessages)
      .required(),
    buffer: Joi.binary()
      .messages(avaratBufferMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(avatar);

  return { validationError, data };
};

const validateUsername = (username = {}) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .lowercase()
      .alphanum()
      .messages(createUsernameMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(username);

  return { validationError, data };
};

const validatePasswords = (passwords = {}) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .trim()
      .messages(passwordMessages)
      .required(),
    new_password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .regex(passwordRegExp)
      .messages(createPasswordMessages)
      .required(),
    confirm_password: Joi.string()
      .trim()
      .valid(Joi.ref('new_password'))
      .messages(confirmPasswordMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(passwords);

  return { validationError, data };
};

const validatePassword = (password = {}) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .trim()
      .messages(passwordMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(password);

  return { validationError, data };
};

module.exports = {
  validateEmail,
  validateAvatar,
  validateUsername,
  validatePasswords,
  validatePassword,
};
