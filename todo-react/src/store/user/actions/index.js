import { getUser } from '../../../helpers/api/users';

export const SET_USER = 'SET_USER';
export const FETCH_AND_SET_USER = 'FETCH_AND_SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const setUser = (user = {}) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    user,
  });
};

export const fetchAndSetUser = ({ id = '', token = '' }) => async (dispatch) => {
  const { data: user = {} } = await getUser({ id, token });

  if (user) {
    dispatch({
      type: FETCH_AND_SET_USER,
      user,
    });
  }
};
