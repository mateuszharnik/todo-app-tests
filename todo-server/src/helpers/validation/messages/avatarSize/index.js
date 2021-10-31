const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeNumberMessage = 'Właściwość {#label} musi być typu "number".';

const avatarSizeMaxMessage = 'Awatar może mieć maksymalnie 5MB.';

const avatarSizeRequired = {
  'any.required': propertyRequiredMessage,
};

const avatarSizeNumber = {
  'number.base': typeNumberMessage,
};

const avatarSizeMax = {
  'number.max': avatarSizeMaxMessage,
};

const avatarSizeMessages = {
  ...avatarSizeRequired,
  ...avatarSizeNumber,
  ...avatarSizeMax,
};

module.exports = {
  avatarSizeMax,
  avatarSizeRequired,
  avatarSizeNumber,
  avatarSizeMessages,
};
