const propertyNotAllowedMessage = 'Właściwość {#label} jest niedozwolona.';

const propertyNotAllowed = {
  'object.unknown': propertyNotAllowedMessage,
};

const unknownMessages = {
  ...propertyNotAllowed,
};

module.exports = {
  unknownMessages,
  propertyNotAllowed,
};
