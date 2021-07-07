const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeBooleanMessage = 'Właściwość {#label} musi być typu "boolean".';

const termsOfUseRequiredMessage = 'Akceptacja regulaminu jest wymagana.';

const termsOfUseRequired = {
  'any.required': propertyRequiredMessage,
};

const termsOfUseOnly = {
  'any.only': termsOfUseRequiredMessage,
};

const termsOfUseBoolean = {
  'boolean.base': typeBooleanMessage,
};

const termsOfUseMessages = {
  ...termsOfUseRequired,
  ...termsOfUseBoolean,
  ...termsOfUseOnly,
};

module.exports = {
  termsOfUseRequired,
  termsOfUseOnly,
  termsOfUseBoolean,
  termsOfUseMessages,
};
