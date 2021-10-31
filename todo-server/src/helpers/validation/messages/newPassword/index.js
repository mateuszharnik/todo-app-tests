const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const newPasswordRequiredMessage = 'Nowe hasło jest wymagane.';
const newPasswordMinLengthMessage = 'Nowe hasło musi mieć minimum 8 znaków.';
const newPasswordMaxLengthMessage = 'Nowe hasło może mieć maksymalnie 32 znaki.';
const newPasswordPatternMessage = 'Nowe hasło musi zawierać małą i dużą literę, cyfrę i znak specjalny.';
const newPasswordTheSameMessage = 'Nowe hasło nie może być takie same jak stare.';

const newPasswordRequired = {
  'any.required': propertyRequiredMessage,
};

const newPasswordNotEmpty = {
  'string.empty': newPasswordRequiredMessage,
};

const newPasswordString = {
  'string.base': typeStringMessage,
};

const newPasswordMin = {
  'string.min': newPasswordMinLengthMessage,
};

const newPasswordMax = {
  'string.max': newPasswordMaxLengthMessage,
};

const newPasswordPattern = {
  'string.pattern.base': newPasswordPatternMessage,
};

const newPasswordNotMatch = {
  'any.invalid': newPasswordTheSameMessage,
};

const newPasswordMessages = {
  ...newPasswordRequired,
  ...newPasswordNotEmpty,
  ...newPasswordString,
  ...newPasswordMin,
  ...newPasswordMax,
  ...newPasswordPattern,
  ...newPasswordNotMatch,
};

module.exports = {
  newPasswordRequired,
  newPasswordNotEmpty,
  newPasswordString,
  newPasswordMin,
  newPasswordMax,
  newPasswordPattern,
  newPasswordNotMatch,
  newPasswordMessages,
};
