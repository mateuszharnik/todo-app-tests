import {
  fetchUser,
} from '../../helpers/api/users';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const removeUserAction = () => ({
  type: REMOVE_USER,
});

export const setUserAction = ({ user = {} }) => ({
  type: SET_USER,
  user,
});

export const fetchUserAction = ({ id = '', token = '' }) => (dispatch) => new Promise((resolve, reject) => {
  fetchUser({ id, token })
    .then((response = {}) => {
      const { data: user = {} } = response;

      if (user) {
        dispatch({
          type: SET_USER,
          user,
        });
      }

      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});
