const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const mimetypeRequiredMessage = 'Typ pliku jest wymagany.';
const mimetypeNotCorrectMessage = 'Awatar musi być typu jpg, jpeg lub png.';

const mimetypeRequired = {
  'any.required': propertyRequiredMessage,
};

const mimetypeNotEmpty = {
  'string.empty': mimetypeRequiredMessage,
};

const mimetypeString = {
  'string.base': typeStringMessage,
};

const mimetypePattern = {
  'string.pattern.base': mimetypeNotCorrectMessage,
};

const mimetypeMessages = {
  ...mimetypeRequired,
  ...mimetypeString,
  ...mimetypeNotEmpty,
  ...mimetypePattern,
};

module.exports = {
  mimetypeRequired,
  mimetypeString,
  mimetypeNotEmpty,
  mimetypePattern,
  mimetypeMessages,
};
