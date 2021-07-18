const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeBinaryMessage = 'Właściwość {#label} musi być typu "binary".';

const avaratBufferRequired = {
  'any.required': propertyRequiredMessage,
};

const avaratBufferBinary = {
  'binary.base': typeBinaryMessage,
};

const avaratBufferMessages = {
  ...avaratBufferRequired,
  ...avaratBufferBinary,
};

module.exports = {
  avaratBufferRequired,
  avaratBufferBinary,
  avaratBufferMessages,
};
