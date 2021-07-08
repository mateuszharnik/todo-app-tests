const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const userIdRequiredMessage = 'Id użytkownika jest wymagane.';
const userIdPatternMessage = 'Id użytkownika jest nieprawidłowe.';

const userIdRequired = {
  'any.required': propertyRequiredMessage,
};

const userIdNotEmpty = {
  'string.empty': userIdRequiredMessage,
};

const userIdString = {
  'string.base': typeStringMessage,
};

const userIdPattern = {
  'string.pattern.base': userIdPatternMessage,
};

const userIdMessages = {
  ...userIdRequired,
  ...userIdNotEmpty,
  ...userIdString,
  ...userIdPattern,
};

module.exports = {
  userIdRequired,
  userIdNotEmpty,
  userIdString,
  userIdPattern,
  userIdMessages,
};
