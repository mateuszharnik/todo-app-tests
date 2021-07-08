const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const descriptionRequiredMessage = 'Opis jest wymagany.';
const descriptionMaxLengthMessage = 'Opis może mieć maksymalnie 512 znaków.';

const descriptionRequired = {
  'any.required': propertyRequiredMessage,
};

const descriptionNotEmpty = {
  'string.empty': descriptionRequiredMessage,
};

const descriptionString = {
  'string.base': typeStringMessage,
};

const descriptionMax = {
  'string.max': descriptionMaxLengthMessage,
};

const descriptionMessages = {
  ...descriptionRequired,
  ...descriptionNotEmpty,
  ...descriptionString,
  ...descriptionMax,
};

module.exports = {
  descriptionRequired,
  descriptionNotEmpty,
  descriptionString,
  descriptionMax,
  descriptionMessages,
};
