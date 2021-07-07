const { confirmPasswordMessages } = require('./confirmPassword');
const { emailMessages } = require('./email');
const { passwordMessages, createPasswordMessages } = require('./password');
const { termsOfUseMessages } = require('./termsOfUse');
const { usernameMessages, createUsernameMessages } = require('./username');

module.exports = {
  usernameMessages,
  createUsernameMessages,
  termsOfUseMessages,
  passwordMessages,
  createPasswordMessages,
  emailMessages,
  confirmPasswordMessages,
};
