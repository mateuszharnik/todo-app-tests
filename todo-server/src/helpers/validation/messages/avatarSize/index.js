const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeNumberMessage = 'Właściwość {#label} musi być typu "number".';

const avatarSizeMaxMessage = 'Awatar może mieć maksymalnie 5 MB.';

const avaratSizeRequired = {
  'any.required': propertyRequiredMessage,
};

const avaratSizeNumber = {
  'number.base': typeNumberMessage,
};

const avaratSizeMax = {
  'number.max': avatarSizeMaxMessage,
};

const avaratSizeMessages = {
  ...avaratSizeRequired,
  ...avaratSizeNumber,
  ...avaratSizeMax,
};

module.exports = {
  avaratSizeMax,
  avaratSizeRequired,
  avaratSizeNumber,
  avaratSizeMessages,
};
