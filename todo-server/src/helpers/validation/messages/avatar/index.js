const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const avatarRequiredMessage = 'Musisz podać adres URL.';
const avatarNotCorrectMessage = 'Awatar musi być prawidłowym adresem URL.';

const avatarRequired = {
  'any.required': propertyRequiredMessage,
};

const avatarNotEmpty = {
  'string.empty': avatarRequiredMessage,
};

const avatarString = {
  'string.base': typeStringMessage,
};

const avatarPattern = {
  'string.uri': avatarNotCorrectMessage,
};

const avatarMessages = {
  ...avatarRequired,
  ...avatarString,
  ...avatarNotEmpty,
  ...avatarPattern,
};

module.exports = {
  avatarRequired,
  avatarString,
  avatarNotEmpty,
  avatarPattern,
  avatarMessages,
};
