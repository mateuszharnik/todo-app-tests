const bcrypt = require('bcryptjs');
const User = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
const { userIdMessages } = require('../../../helpers/validation/messages/userID');
const { validateDbId } = require('../../../helpers/schemas');
const {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswords,
  validateAvatar,
} = require('./index.schema');

const getUser = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(
    _id,
    userIdMessages,
  );

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  try {
    const user = await User.findOne({
      _id, deleted_at: null,
    }).select('-password');

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    return res.status(200).json(user);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateEmail = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(_id, userIdMessages);

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  const { validationError, data } = validateEmail(req.body);

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const user = await User.findOne({
      _id,
      deleted_at: null,
    }).select('-password');

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    if (user.email === data.email) {
      return res.status(200).json(user);
    }

    const { email = '' } = await User.findOne({
      email: data.email,
      deleted_at: null,
    }).select('-password') || {};

    if (email) {
      return responseWithError(res, next, 409, 'Adres email jest już zajęty.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { email: data.email },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się zmienić adresu email.',
      );
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateUsername = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(_id, userIdMessages);

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  const { validationError, data } = validateUsername(req.body);

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const user = await User.findOne({
      _id,
      deleted_at: null,
    }).select('-password');

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    if (user.username === data.username) {
      return res.status(200).json(user);
    }

    const { username = '' } = await User.findOne({
      username: data.username,
      deleted_at: null,
    }).select('-password') || {};

    if (username) {
      return responseWithError(res, next, 409, 'Nazwa użytkownika jest już zajęta.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username: data.username },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się zmienić nazwy użytkownika.',
      );
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updatePassword = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(_id, userIdMessages);

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  const { validationError, data } = validatePasswords(req.body);

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const user = await User.findOne({
      _id,
      deleted_at: null,
    });

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return responseWithError(res, next, 409, 'Hasło jest nieprawidłowe.');
    }

    const password = await bcrypt.hash(data.new_password, 12);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { password },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się zmienić hasła.',
      );
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateAvatar = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(_id, userIdMessages);

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  const { avatar = {} } = req.files || {};
  const { data: buffer, mimetype, size } = avatar;

  req.body = {
    buffer,
    mimetype,
    size,
  };

  const { validationError, data } = validateAvatar(req.body);

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const user = await User.findOne({
      _id,
      deleted_at: null,
    }).select('-password');

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatar: data.buffer },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się zmienić awatara użytkownika.',
      );
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteAvatar = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(_id, userIdMessages);

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  try {
    const user = await User.findOne({
      _id,
      deleted_at: null,
    }).select('-password');

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatar: '' },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się usunąć awatara użytkownika.',
      );
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteUser = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: userIdError } = validateDbId(_id, userIdMessages);

  if (userIdError) {
    return responseWithError(res, next, 409, userIdError.details[0].message);
  }

  const { validationError, data } = validatePassword(req.body);

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const user = await User.findOne({
      _id,
      deleted_at: null,
    });

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    if (user.id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      return responseWithError(res, next, 409, 'Hasło jest nieprawidłowe.');
    }

    const deletedUser = await User.findByIdAndUpdate(
      _id,
      { deleted_at: Date.now() },
      { new: true },
    ).select('-password');

    if (!deletedUser && !deletedUser.deleted_at) {
      return responseWithError(res, next, 409, 'Nie udało się usunąć użytkownika.');
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  getUser,
  updateEmail,
  updateUsername,
  updatePassword,
  updateAvatar,
  deleteAvatar,
  deleteUser,
};
