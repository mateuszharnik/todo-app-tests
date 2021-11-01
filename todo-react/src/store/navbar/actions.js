export const TOGGLE_MENU = 'TOGGLE_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';
export const SET_IS_DISABLED = 'SET_IS_DISABLED';
export const SET_IS_OPEN = 'SET_IS_OPEN';

export const toggleMenuAction = () => (dispatch, getState) => {
  const { isDisabled } = getState().navbar;

  if (isDisabled) return;

  dispatch({
    type: TOGGLE_MENU,
  });

  setTimeout(
    () => dispatch({
      type: SET_IS_DISABLED,
      isDisabled: false,
    }),
    400,
  );
};

export const closeMenuAction = () => (dispatch) => {
  dispatch({
    type: CLOSE_MENU,
  });

  setTimeout(
    () => dispatch({
      type: SET_IS_DISABLED,
      isDisabled: false,
    }),
    400,
  );
};

export const setIsOpenAction = (isOpen) => (dispatch) => {
  dispatch({
    type: SET_IS_OPEN,
    isOpen,
  });

  dispatch({
    type: SET_IS_DISABLED,
    isDisabled: false,
  });
};
