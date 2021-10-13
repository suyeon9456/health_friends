import produce from 'immer';

const initialState = {
  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
};

export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';

const reducer = (state = initialState, action) => (produce(state, (draft) => {
  switch (action.type) {
    case ADD_SCHEDULE_REQUEST:
      draft.addGymLoading = true;
      draft.addGymDone = false;
      draft.addGymError = null;
      break;
    case ADD_SCHEDULE_SUCCESS:
      draft.addGymLoading = false;
      draft.addGymDone = true;
      draft.addGymError = null;
      break;
    case ADD_SCHEDULE_ERROR:
      draft.addGymLoading = false;
      draft.addGymDone = false;
      draft.addGymError = draft.error;
      break;
    default:
      break;
  }
}));

export default reducer;
