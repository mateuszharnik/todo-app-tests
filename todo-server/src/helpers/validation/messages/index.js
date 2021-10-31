const { avatarMessages } = require('./avatar');
const { avatarBufferMessages } = require('./avatarBuffer');
const { avatarSizeMessages } = require('./avatarSize');
const { boardIdMessages } = require('./boardID');
const { confirmPasswordMessages } = require('./confirmPassword');
const { idMessages } = require('./dbID');
const { descriptionMessages } = require('./description');
const { emailMessages } = require('./email');
const { genderMessages } = require('./gender');
const { mimetypeMessages } = require('./mimetype');
const { newPasswordMessages } = require('./newPassword');
const { passwordMessages, createPasswordMessages } = require('./password');
const { taskIdMessages } = require('./taskID');
const { termsOfUseMessages } = require('./termsOfUse');
const { titleMessages } = require('./title');
const { unknownMessages } = require('./unknown');
const { userIdMessages } = require('./userID');
const { usernameMessages, createUsernameMessages } = require('./username');

module.exports = {
  avatarMessages,
  avatarBufferMessages,
  avatarSizeMessages,
  boardIdMessages,
  usernameMessages,
  descriptionMessages,
  genderMessages,
  idMessages,
  createUsernameMessages,
  termsOfUseMessages,
  passwordMessages,
  newPasswordMessages,
  createPasswordMessages,
  emailMessages,
  confirmPasswordMessages,
  taskIdMessages,
  mimetypeMessages,
  titleMessages,
  unknownMessages,
  userIdMessages,
};
