import React, { createContext, useContext } from 'react';
import { GlobalModalType, ModalStatusType } from '../@types/utils';

export interface Initial {
  id?: string;
  type?: GlobalModalType;
  statusType?: ModalStatusType;
  message?: any;
  block?: boolean;
  callback?: () => void;
}

// state type
export interface InitialState {
  basic: Initial[];
  custom: Array<{
    id?: string;
  }>;
  isDrawer: boolean;
}

type Action =
  | {
      type: 'SHOW_MODAL';
      payload: {
        type: GlobalModalType;
        statusType: ModalStatusType;
        message: any;
        block?: boolean;
        callback?: () => void;
      };
    }
  | { type: 'HIDDEN_MODAL'; payload: string }
  | { type: 'SHOW_CUSTOM_MODAL'; payload: string }
  | { type: 'HIDDEN_CUSTOM_MODAL'; payload: string }
  | { type: 'CHANGE_DRAWER'; payload: boolean };

export const initialState: InitialState = {
  basic: [],
  custom: [],
  isDrawer: false,
};

export const ModalStateContext = createContext<InitialState | null>(null);
export const ModalDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

export const modalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        basic: [
          ...state.basic,
          {
            ...action.payload,
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            id: `${action.payload}_${Date.now()}`,
          },
        ],
      };
    case 'HIDDEN_MODAL':
      return {
        ...state,
        basic: state.basic.filter(({ id }) => id !== action.payload),
      };
    case 'SHOW_CUSTOM_MODAL':
      return {
        ...state,
        custom: [
          ...state.custom,
          {
            id: action.payload,
          },
        ],
      };
    case 'HIDDEN_CUSTOM_MODAL':
      return {
        ...state,
        custom: state.custom.filter(({ id }) => id !== action.payload),
      };
    case 'CHANGE_DRAWER':
      return {
        ...state,
        isDrawer: action.payload,
      };
    default:
      return state;
  }
};

export const useModalState = () => {
  const state = useContext(ModalStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
};
export const useModalDispatch = () => {
  const dispatch = useContext(ModalDispatchContext);
  if (!dispatch) throw new Error('error');
  return dispatch;
};
