const propertyRequiredMessage = 'Właściwość {#label} jest wymagana.';

const typeStringMessage = 'Właściwość {#label} musi być typu "string".';

const usernameRequiredMessage = 'Nazwa użytkownika jest wymagana.';
const usernameMinLengthMessage = 'Nazwa użytkownika musi mieć minimum 3 znaki.';
const usernameMaxLengthMessage = 'Nazwa użytkownika może mieć maksymalnie 32 znaki.';
const usernameAlphanumMessage = 'Nazwa użytkownika może zawierać tylko cyfry i litery.';

const usernameRequired = {
  'any.required': propertyRequiredMessage,
};

const usernameNotEmpty = {
  'string.empty': usernameRequiredMessage,
};

const usernameString = {
  'string.base': typeStringMessage,
};

const usernameMin = {
  'string.min': usernameMinLengthMessage,
};

const usernameMax = {
  'string.max': usernameMaxLengthMessage,
};

const usernameAlphanum = {
  'string.alphanum': usernameAlphanumMessage,
};

const createUsernameMessages = {
  ...usernameRequired,
  ...usernameNotEmpty,
  ...usernameString,
  ...usernameAlphanum,
  ...usernameMax,
  ...usernameMin,
};

const usernameMessages = {
  ...usernameRequired,
  ...usernameNotEmpty,
  ...usernameString,
};

module.exports = {
  usernameRequired,
  usernameNotEmpty,
  usernameString,
  usernameAlphanum,
  usernameMax,
  usernameMin,
  usernameMessages,
  createUsernameMessages,
};
