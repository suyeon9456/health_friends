import { AxiosResponse } from 'axios';
import React, { createContext, useContext } from 'react';
import { GlobalModalType, ModalStatusType } from '../@types/utils';

// 상태를 위한 타입
export type InitialState = {
  id?: string;
  type?: GlobalModalType;
  statusType?: ModalStatusType;
  message?: any;
  block?: boolean;
  callback?: () => void;
}[];

type Action =
  | { type: 'SHOW_MODAL';
      payload: {
        type: GlobalModalType;
        statusType: ModalStatusType;
        message: any;
        block?: boolean;
        callback?: () => void;
    } }
  | { type: 'HIDDEN_MODAL'; payload: string };

export const initialState: InitialState = [];

export const UseModalStateContext = createContext<InitialState | null>(null);
export const UseModalDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const modalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return [...state, {
        ...action.payload,
        id: `${action.payload}_${Date.now()}`
      }];
    case 'HIDDEN_MODAL':
      return state.filter(({ id }) => id !== action.payload);
    default:
      return state;
  }
};

export const useModalState = () => {
  const state = useContext(UseModalStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
};
export const useModalDispatch = () => {
  const dispatch = useContext(UseModalDispatchContext);
  if (!dispatch) throw new Error('error');
  return dispatch;
};
