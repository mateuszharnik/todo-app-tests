const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeBinaryMessage = 'Właściwość {#label} musi być typu "binary".';

const avatarBufferRequired = {
  'any.required': propertyRequiredMessage,
};

const avatarBufferBinary = {
  'binary.base': typeBinaryMessage,
};

const avatarBufferMessages = {
  ...avatarBufferRequired,
  ...avatarBufferBinary,
};

module.exports = {
  avatarBufferRequired,
  avatarBufferBinary,
  avatarBufferMessages,
};
