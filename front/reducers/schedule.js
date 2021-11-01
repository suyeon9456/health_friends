import produce from 'immer';

const initialState = {
  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
  loadScheduleLoading: false,
  loadScheduleDone: false,
  loadScheduleError: null,
  schedules: [],
  schedule: null,
};

export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';

export const LOAD_SCHEDULE_REQUEST = 'LOAD_SCHEDULE_REQUEST';
export const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
export const LOAD_SCHEDULE_ERROR = 'LOAD_SCHEDULE_ERROR';

export const SET_SCHEDULE = 'SET_SCHEDULES';

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
      draft.addGymError = action.error;
      break;
    case LOAD_SCHEDULE_REQUEST:
      draft.loadGymLoading = true;
      draft.loadGymDone = false;
      draft.loadGymError = null;
      break;
    case LOAD_SCHEDULE_SUCCESS:
      draft.loadGymLoading = false;
      draft.loadGymDone = true;
      draft.loadGymError = null;
      draft.schedules = action.data.map((schedule) => {
        console.log('date', new Date(schedule));
        return ({
          id: schedule.id,
          start: new Date(schedule.date),
          end: new Date(schedule.date),
          nickname: schedule.Friend.nickname,
          address: schedule.Gym.address,
          description: schedule.description,
        });
      });
      break;
    case LOAD_SCHEDULE_ERROR:
      draft.loadGymLoading = false;
      draft.loadGymDone = false;
      draft.loadGymError = action.error;
      break;
    case SET_SCHEDULE:
      draft.schedule = draft.schedules.find((item) => item.id === action.data);
      break;
    default:
      break;
  }
}));

export default reducer;
