const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const genderRequiredMessage = 'Płeć jest wymagana.';
const genderOnlyMessage = 'Proszę wybrać płeć między kobieta a mężczyzna.';

const genderRequired = {
  'any.required': propertyRequiredMessage,
};

const genderNotEmpty = {
  'string.empty': genderRequiredMessage,
};

const genderOnly = {
  'any.only': genderOnlyMessage,
};

const genderString = {
  'string.base': typeStringMessage,
};

const genderMessages = {
  ...genderRequired,
  ...genderNotEmpty,
  ...genderString,
  ...genderOnly,
};

module.exports = {
  genderRequired,
  genderString,
  genderOnly,
  genderNotEmpty,
  genderMessages,
};
