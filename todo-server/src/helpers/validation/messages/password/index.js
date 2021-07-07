const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const passwordRequiredMessage = 'Hasło jest wymagane.';
const passwordMinLengthMessage = 'Hasło musi mieć minimum 8 znaków.';
const passwordMaxLengthMessage = 'Hasło może mieć maksymalnie 32 znaki.';
const passwordPatternMessage = 'Hasło musi zawierać małą i dużą literę, cyfrę i znak specjalny.';

const passwordRequired = {
  'any.required': propertyRequiredMessage,
};

const passwordNotEmpty = {
  'string.empty': passwordRequiredMessage,
};

const passwordString = {
  'string.base': typeStringMessage,
};

const passwordMin = {
  'string.min': passwordMinLengthMessage,
};

const passwordMax = {
  'string.max': passwordMaxLengthMessage,
};

const passwordPattern = {
  'string.pattern.base': passwordPatternMessage,
};

const createPasswordMessages = {
  ...passwordRequired,
  ...passwordNotEmpty,
  ...passwordString,
  ...passwordMin,
  ...passwordMax,
  ...passwordPattern,
};

const passwordMessages = {
  ...passwordRequired,
  ...passwordNotEmpty,
  ...passwordString,
};

module.exports = {
  passwordRequired,
  passwordNotEmpty,
  passwordString,
  passwordMin,
  passwordMax,
  passwordPattern,
  passwordMessages,
  createPasswordMessages,
};
