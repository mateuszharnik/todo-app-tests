const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const emailRequiredMessage = 'Adres email jest wymagany.';
const emailNotCorrectMessage = 'Adres email jest nieprawidłowy.';

const emailRequired = {
  'any.required': propertyRequiredMessage,
};

const emailNotEmpty = {
  'string.empty': emailRequiredMessage,
};

const emailString = {
  'string.base': typeStringMessage,
};

const emailPattern = {
  'string.pattern.base': emailNotCorrectMessage,
};

const emailMessages = {
  ...emailRequired,
  ...emailNotEmpty,
  ...emailString,
  ...emailPattern,
};

module.exports = {
  emailRequired,
  emailNotEmpty,
  emailString,
  emailPattern,
  emailMessages,
};
