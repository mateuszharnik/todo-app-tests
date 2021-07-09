const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const idRequiredMessage = 'Id jest wymagane.';
const idPatternMessage = 'Id jest nieprawidłowe.';

const idRequired = {
  'any.required': propertyRequiredMessage,
};

const idNotEmpty = {
  'string.empty': idRequiredMessage,
};

const idString = {
  'string.base': typeStringMessage,
};

const idPattern = {
  'string.pattern.base': idPatternMessage,
};

const idMessages = {
  ...idRequired,
  ...idNotEmpty,
  ...idString,
  ...idPattern,
};

module.exports = {
  idRequired,
  idNotEmpty,
  idString,
  idPattern,
  idMessages,
};
