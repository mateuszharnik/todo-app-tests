import { SET_TOKEN_AND_PAYLOAD, REMOVE_TOKEN_AND_PAYLOAD } from './actions';

const initialState = {
  payload: null,
  token: '',
};

const reducer = (state = initialState, { type, token, payload }) => {
  switch (type) {
    case SET_TOKEN_AND_PAYLOAD:
      return {
        ...state,
        payload,
        token,
      };
    case REMOVE_TOKEN_AND_PAYLOAD:
      return {
        ...state,
        payload: null,
        token: '',
      };
    default:
      return state;
  }
};

export default reducer;
