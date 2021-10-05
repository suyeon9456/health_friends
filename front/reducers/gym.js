import produce from 'immer';

const initialState = {
  addGymLoading: false,
  addGymDone: false,
  addGymError: null,
};

export const ADD_GYM_REQUEST = 'ADD_GYM_REQUEST';
export const ADD_GYM_SUCCESS = 'ADD_GYM_SUCCESS';
export const ADD_GYM_ERROR = 'ADD_GYM_ERROR';

const reducer = (state = initialState, action) => (produce(state, (draft) => {
  switch (action.type) {
    case ADD_GYM_REQUEST:
      draft.addGymLoading = true;
      draft.addGymDone = false;
      draft.addGymError = null;
      break;
    case ADD_GYM_SUCCESS:
      draft.addGymLoading = false;
      draft.addGymDone = true;
      draft.addGymError = null;
      break;
    case ADD_GYM_ERROR:
      draft.addGymLoading = false;
      draft.addGymDone = false;
      draft.addGymError = draft.error;
      break;
    default:
      break;
  }
}));

export default reducer;
