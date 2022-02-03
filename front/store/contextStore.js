import { createContext, useContext } from 'react';

export const ShowStateContext = createContext(null);
export const ShowDispatchContext = createContext(null);

export const initialState = {
  drawerShow: false,
  alertShow: false,
  modalShow: false,
  editNickname: false,
  editDescription: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_STATE':
      return {
        ...state,
        drawerShow: action.value,
      };
    case 'CHANGE_STATE_ALERT':
      return {
        ...state,
        alertShow: action.value,
      };
    case 'CHANGE_STATE_MODAL':
      return {
        ...state,
        modalShow: action.value,
      };
    default:
      return state;
  }
};

export const useShowState = () => {
  const state = useContext(ShowStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
};
export const useShowDispatch = () => {
  const dispatch = useContext(ShowDispatchContext);
  if (!dispatch) throw new Error('error');
  return dispatch;
};
