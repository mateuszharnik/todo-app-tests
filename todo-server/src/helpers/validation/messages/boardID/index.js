const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const boardIdRequiredMessage = 'Id tablicy jest wymagane.';
const boardIdPatternMessage = 'Id tablicy jest nieprawidłowe.';

const boardIdRequired = {
  'any.required': propertyRequiredMessage,
};

const boardIdNotEmpty = {
  'string.empty': boardIdRequiredMessage,
};

const boardIdString = {
  'string.base': typeStringMessage,
};

const boardIdPattern = {
  'string.pattern.base': boardIdPatternMessage,
};

const boardIdMessages = {
  ...boardIdRequired,
  ...boardIdNotEmpty,
  ...boardIdString,
  ...boardIdPattern,
};

module.exports = {
  boardIdRequired,
  boardIdNotEmpty,
  boardIdString,
  boardIdPattern,
  boardIdMessages,
};
