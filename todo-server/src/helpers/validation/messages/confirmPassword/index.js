const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const confirmPasswordNotMatchMessage = 'Hasła nie są takie same.';

const confirmPasswordRequired = {
  'any.required': propertyRequiredMessage,
};

const confirmPasswordNotMatch = {
  'any.only': confirmPasswordNotMatchMessage,
};

const confirmPasswordMessages = {
  ...confirmPasswordRequired,
  ...confirmPasswordNotMatch,
};

module.exports = {
  confirmPasswordRequired,
  confirmPasswordNotMatch,
  confirmPasswordMessages,
};
