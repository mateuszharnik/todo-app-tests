const jwt = require('jsonwebtoken');
const config = require('../../config');
const { responseWithError } = require('../../helpers/errors');

const { SECRET } = config;

const signToken = (payload = {}, expiresIn = '1d') => new Promise((resolve, reject) => {
  jwt.sign(payload, SECRET, { expiresIn }, (error, token) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
});

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRET, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

const setUser = async (req, token) => {
  try {
    const user = await verifyToken(token);

    if (user) {
      req.user = user;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const checkToken = async (req, res, next) => {
  const authHeader = req.get('authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      await setUser(req, token);
    }
  }

  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    return responseWithError(
      res,
      next,
      401,
      'Musisz być zalogowany.',
    );
  }

  return next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return responseWithError(
      res,
      next,
      403,
      'Użytkownik jest aktualnie zalogowany.',
    );
  }

  return next();
};

module.exports = {
  signToken,
  checkToken,
  isNotLoggedIn,
  isLoggedIn,
};
