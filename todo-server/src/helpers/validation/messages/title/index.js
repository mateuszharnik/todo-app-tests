const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const titleRequiredMessage = 'Tytuł jest wymagany.';
const titleMinLengthMessage = 'Tytuł musi mieć minimum 1 znak.';
const titleMaxLengthMessage = 'Tytuł może mieć maksymalnie 512 znaków.';

const titleRequired = {
  'any.required': propertyRequiredMessage,
};

const titleNotEmpty = {
  'string.empty': titleRequiredMessage,
};

const titleString = {
  'string.base': typeStringMessage,
};

const titleMin = {
  'string.min': titleMinLengthMessage,
};

const titleMax = {
  'string.max': titleMaxLengthMessage,
};

const titleMessages = {
  ...titleRequired,
  ...titleNotEmpty,
  ...titleString,
  ...titleMin,
  ...titleMax,
};

module.exports = {
  titleRequired,
  titleNotEmpty,
  titleString,
  titleMin,
  titleMax,
  titleMessages,
};
