const Joi = require('joi');
const { emailRegExp, passwordRegExp } = require('../helpers/regexps');
const { termsOfUseMessages } = require('../helpers/validation/messages');
const { confirmPasswordMessages } = require('../helpers/validation/messages/confirmPassword');
const { emailMessages } = require('../helpers/validation/messages/email');
const { passwordMessages, createPasswordMessages } = require('../helpers/validation/messages/password');
const { usernameMessages, createUsernameMessages } = require('../helpers/validation/messages/username');

const validateSignUpCredentials = (credentials = {}) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .lowercase()
      .alphanum()
      .messages(createUsernameMessages)
      .required(),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .lowercase()
      .messages(emailMessages)
      .required(),
    password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .regex(passwordRegExp)
      .messages(createPasswordMessages)
      .required(),
    confirm_password: Joi.string()
      .trim()
      .valid(Joi.ref('password'))
      .messages(confirmPasswordMessages)
      .required(),
    terms_of_use_accepted: Joi.boolean()
      .valid(true)
      .messages(termsOfUseMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(credentials);

  return { validationError, data };
};

const validateSignInCredentials = (credentials = {}) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .lowercase()
      .messages(usernameMessages)
      .required(),
    password: Joi.string()
      .trim()
      .messages(passwordMessages)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(credentials);

  return { validationError, data };
};

module.exports = {
  validateSignUpCredentials,
  validateSignInCredentials,
};
