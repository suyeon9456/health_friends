import React, { createContext, useContext } from 'react';
import {
  GlobalModal,
  GlobalModalAction,
  GlobalModalActionType,
  GlobalModalType,
  ModalStatus,
  ModalStatusType,
} from '../@types/constant';

export interface Initial {
  id?: string;
  type?: GlobalModalActionType;
  statusType?: ModalStatusType;
  message?: string;
  block?: boolean;
  callback?: () => void;
}

export interface InitialState {
  basic: Initial[];
  custom: Array<{
    id?: string;
  }>;
  isDrawer: boolean;
}

type Action =
  | {
      type: typeof GlobalModalAction.SHOW_MODAL;
      payload: {
        type: GlobalModalType;
        statusType: ModalStatusType;
        message: any;
        block?: boolean;
        callback?: () => void;
      };
    }
  | { type: typeof GlobalModalAction.HIDDEN_MODAL; payload: string }
  | { type: typeof GlobalModalAction.SHOW_CUSTOM_MODAL; payload: string }
  | { type: typeof GlobalModalAction.HIDDEN_CUSTOM_MODAL; payload: string }
  | { type: typeof GlobalModalAction.CHANGE_DRAWER; payload: boolean };

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
    case GlobalModalAction.SHOW_MODAL:
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
    case GlobalModalAction.HIDDEN_MODAL:
      return {
        ...state,
        basic: state.basic.filter(({ id }) => id !== action.payload),
      };
    case GlobalModalAction.SHOW_CUSTOM_MODAL:
      return {
        ...state,
        custom: [
          ...state.custom,
          {
            id: action.payload,
          },
        ],
      };
    case GlobalModalAction.HIDDEN_CUSTOM_MODAL:
      return {
        ...state,
        custom: state.custom.filter(({ id }) => id !== action.payload),
      };
    case GlobalModalAction.CHANGE_DRAWER:
      return {
        ...state,
        isDrawer: action.payload,
      };
    default:
      return state;
  }
};

export const changeModal = ({
  status = ModalStatus.ERROR,
  message,
  block = true,
  callback,
}: {
  status?: ModalStatusType;
  message?: string;
  block?: boolean;
  callback?: () => void;
}) => ({
  type: GlobalModalAction.SHOW_MODAL,
  payload: {
    type: GlobalModal.ALERT,
    statusType: status,
    message,
    block,
    callback,
  },
});

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
