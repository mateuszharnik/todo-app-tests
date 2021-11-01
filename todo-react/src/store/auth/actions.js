import { signUpUser, signInUser } from '../../helpers/api/auth';
import { getToken, removeToken, setToken } from '../../helpers/token';

export const SET_TOKEN_AND_PAYLOAD = 'SET_TOKEN_AND_PAYLOAD';
export const REMOVE_TOKEN_AND_PAYLOAD = 'REMOVE_TOKEN_AND_PAYLOAD';

export const signOutUserAction = (dispatch) => {
  const token = getToken();

  if (token) {
    removeToken();
  }

  return dispatch({
    type: REMOVE_TOKEN_AND_PAYLOAD,
  });
};

export const signUpUserAction = ({ data = {} }) => (dispatch) => new Promise((resolve, reject) => {
  signUpUser({ data })
    .then((response = {}) => {
      const { data: user = {} } = response;
      const { token = '', user: payload = {} } = user;

      if (token) {
        setToken({ token });
      }

      dispatch({
        type: SET_TOKEN_AND_PAYLOAD,
        token,
        payload,
      });

      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});

export const signInUserAction = ({ data = {} }) => (dispatch) => new Promise((resolve, reject) => {
  signInUser({ data })
    .then((response = {}) => {
      const { data: user = {} } = response;
      const { token = '', user: payload = {} } = user;

      if (token) {
        setToken({ token });
      }

      dispatch({
        type: SET_TOKEN_AND_PAYLOAD,
        token,
        payload,
      });

      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});
