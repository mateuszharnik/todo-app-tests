const Joi = require('joi');
const { emailMessages } = require('../../../helpers/validation/messages/email');
const {
  passwordMessages,
} = require('../../../helpers/validation/messages/password');
const {
  confirmPasswordMessages,
} = require('../../../helpers/validation/messages/confirmPassword');
const {
  unknownMessages,
} = require('../../../helpers/validation/messages/unknown');
const {
  newPasswordMessages,
} = require('../../../helpers/validation/messages/newPassword');
const {
  createUsernameMessages,
} = require('../../../helpers/validation/messages/username');
const {
  avatarMessages,
} = require('../../../helpers/validation/messages/avatar');
const {
  emailRegExp,
  passwordRegExp,
} = require('../../../helpers/regexps');

const validateEmail = (email = {}) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string()
        .trim()
        .regex(emailRegExp)
        .lowercase()
        .messages(emailMessages)
        .required(),
    })
    .unknown(false)
    .messages(unknownMessages);

  const { error: validationError, value: data } = schema.validate(email);

  return { validationError, data };
};

const validateAvatar = (avatar = {}) => {
  const schema = Joi.object()
    .keys({
      avatar: Joi.string().trim().uri().messages(avatarMessages)
        .required(),
    })
    .unknown(false)
    .messages(unknownMessages);

  const { error: validationError, value: data } = schema.validate(avatar);

  return { validationError, data };
};

const validateUsername = (username = {}) => {
  const schema = Joi.object()
    .keys({
      username: Joi.string()
        .trim()
        .min(3)
        .max(32)
        .lowercase()
        .alphanum()
        .messages(createUsernameMessages)
        .required(),
      display_username: Joi.string()
        .trim()
        .min(3)
        .max(32)
        .alphanum()
        .messages(createUsernameMessages)
        .required(),
    })
    .unknown(false)
    .messages(unknownMessages);

  const { error: validationError, value: data } = schema.validate(username);

  return { validationError, data };
};

const validatePasswords = (passwords = {}) => {
  const schema = Joi.object()
    .keys({
      password: Joi.string().trim().messages(passwordMessages).required(),
      new_password: Joi.string()
        .trim()
        .min(8)
        .max(32)
        .regex(passwordRegExp)
        .invalid(Joi.ref('password'))
        .messages(newPasswordMessages)
        .required(),
      confirm_password: Joi.string()
        .trim()
        .valid(Joi.ref('new_password'))
        .messages(confirmPasswordMessages)
        .required(),
    })
    .unknown(false)
    .messages(unknownMessages);

  const { error: validationError, value: data } = schema.validate(passwords);

  return { validationError, data };
};

const validatePassword = (password = {}) => {
  const schema = Joi.object()
    .keys({
      password: Joi.string().trim().messages(passwordMessages).required(),
    })
    .unknown(false)
    .messages(unknownMessages);

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
