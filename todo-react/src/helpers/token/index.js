export const decodeToken = ({ token = '' }) => {
  let decodedToken = {};

  if (token) {
    const data = token.split('.')[1].replace('-', '+').replace('_', '/');

    decodedToken = JSON.parse(window.atob(data));
  }

  return decodedToken;
};

export const getToken = () => JSON.parse(window.localStorage.getItem('token')) || '';

export const setToken = ({ token = '' }) => window.localStorage.setItem('token', JSON.stringify(token));

export const removeToken = () => window.localStorage.removeItem('token');
