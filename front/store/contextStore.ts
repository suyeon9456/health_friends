import { createContext, useContext } from 'react';

// 상태를 위한 타입
type InitialState = {
  drawerShow: boolean,
  alertShow: boolean,
  modalShow: boolean,
  editNickname: boolean,
  editDescription: boolean,
};

type Action =
  | { type: 'CHANGE_STATE'; value: boolean }
  | { type: 'CHANGE_STATE_ALERT'; value: boolean }
  | { type: 'CHANGE_STATE_MODAL'; value: boolean };

export const initialState: InitialState = {
  drawerShow: false,
  alertShow: false,
  modalShow: false,
  editNickname: false,
  editDescription: false,
};

export const ShowStateContext = createContext<InitialState | null>(null);
export const ShowDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const reducer = (state = initialState, action: Action) => {
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
