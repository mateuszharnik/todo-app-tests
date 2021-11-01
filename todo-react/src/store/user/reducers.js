import { SET_USER, REMOVE_USER } from './actions';

const initialState = {
  user: null,
};

const reducer = (state = initialState, { type, user }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
