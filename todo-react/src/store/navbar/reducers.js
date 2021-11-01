import {
  TOGGLE_MENU,
  CLOSE_MENU,
  SET_IS_DISABLED,
  SET_IS_OPEN,
} from './actions';

const initialState = {
  isDisabled: false,
  isOpen: false,
};

const reducer = (state = initialState, { type, isDisabled, isOpen }) => {
  switch (type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isDisabled: true,
        isOpen: !state.isOpen,
      };
    case CLOSE_MENU:
      return {
        ...state,
        isDisabled: true,
        isOpen: false,
      };
    case SET_IS_DISABLED:
      return {
        ...state,
        isDisabled,
      };
    case SET_IS_OPEN:
      return {
        ...state,
        isOpen,
      };
    default:
      return state;
  }
};

export default reducer;
