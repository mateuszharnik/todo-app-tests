const bcrypt = require('bcryptjs');
const User = require('../api/v1/users/index.model');
const { validateSignInCredentials, validateSignUpCredentials } = require('./index.schema');
const { responseWithError } = require('../helpers/errors');
const { signToken } = require('../middlewares/auth');

const signUp = async (req, res, next) => {
  const { validationError, data } = validateSignUpCredentials(req.body);

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const username = await User.findOne({
      username: data.username,
      deleted_at: null,
    });

    if (username) {
      return responseWithError(
        res,
        next,
        409,
        'Nazwa użytkownika jest już zajęta.',
      );
    }

    const email = await User.findOne({
      email: data.email,
      deleted_at: null,
    });

    if (email) {
      return responseWithError(
        res,
        next,
        409,
        'Adres email jest już zajęty.',
      );
    }

    const user = {
      username: data.username,
      email: data.email,
      avatar: '',
      password: await bcrypt.hash(data.password, 12),
      gender: data.gender,
      deleted_at: null,
    };

    const createdUser = await User.create(user);

    if (!createdUser) {
      return responseWithError(res, next, 409, 'Nie udało się utworzyć użytkownika.');
    }

    const payload = {
      id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      avatar: createdUser.avatar,
      gender: createdUser.gender,
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at,
      deleted_at: createdUser.deleted_at,
    };

    const token = await signToken(payload, '1d');

    return res.status(200).json({ user: payload, token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const signIn = async (req, res, next) => {
  const { validationError, data } = validateSignInCredentials(req.body);

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
      $or: [{ username: data.username }, { email: data.email }],
      deleted_at: null,
    });

    if (!user) {
      return responseWithError(res, next, 404, 'Użytkownik nie istnieje.');
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      return responseWithError(res, next, 409, 'Hasło jest nieprawidłowe.');
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      gender: user.gender,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };

    const token = await signToken(payload, '1d');

    return res.status(200).json({ user: payload, token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  signUp,
  signIn,
};
