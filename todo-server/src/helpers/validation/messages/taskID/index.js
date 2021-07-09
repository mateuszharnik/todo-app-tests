const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const taskIdRequiredMessage = 'Id zadania jest wymagane.';
const taskIdPatternMessage = 'Id zadania jest nieprawidłowe.';

const taskIdRequired = {
  'any.required': propertyRequiredMessage,
};

const taskIdNotEmpty = {
  'string.empty': taskIdRequiredMessage,
};

const taskIdString = {
  'string.base': typeStringMessage,
};

const taskIdPattern = {
  'string.pattern.base': taskIdPatternMessage,
};

const taskIdMessages = {
  ...taskIdRequired,
  ...taskIdNotEmpty,
  ...taskIdString,
  ...taskIdPattern,
};

module.exports = {
  taskIdRequired,
  taskIdNotEmpty,
  taskIdString,
  taskIdPattern,
  taskIdMessages,
};
