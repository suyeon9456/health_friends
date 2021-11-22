import { createContext, useContext } from 'react';

export const ShowStateContext = createContext(null);
export const ShowDispatchContext = createContext(null);

export const initialState = {
  drawerShow: false,
};

// const ShowStateStore = ({ children }) => {
//   const [state, dispatch] = useReducer(movieReducer, initialState);

//   return (
//     <ShowStateContext.Provider>
//       {children}
//     </ShowStateContext.Provider>
//   );
// };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_STATE':
      return {
        ...state,
        drawerShow: action.value,
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
  if (!dispatch) throw new Error('errorororoor');
  return dispatch;
};
