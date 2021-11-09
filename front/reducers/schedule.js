import produce from 'immer';

const initialState = {
  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
  loadSchedulesLoading: false,
  loadSchedulesDone: false,
  loadSchedulesError: null,
  loadScheduleLoading: false,
  loadScheduleDone: false,
  loadScheduleError: null,
  updateScheduleLoading: false,
  updateScheduleDone: false,
  updateScheduleError: null,
  updatePermissionLoading: false,
  updatePermissionDone: false,
  updatePermissionError: null,
  schedules: [],
  schedule: null,
};

export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';

export const LOAD_SCHEDULES_REQUEST = 'LOAD_SCHEDULES_REQUEST';
export const LOAD_SCHEDULES_SUCCESS = 'LOAD_SCHEDULES_SUCCESS';
export const LOAD_SCHEDULES_ERROR = 'LOAD_SCHEDULES_ERROR';

export const LOAD_SCHEDULE_REQUEST = 'LOAD_SCHEDULE_REQUEST';
export const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
export const LOAD_SCHEDULE_ERROR = 'LOAD_SCHEDULE_ERROR';

export const UPDATE_SCHEDULE_REQUEST = 'UPDATE_SCHEDULE_REQUEST';
export const UPDATE_SCHEDULE_SUCCESS = 'UPDATE_SCHEDULE_SUCCESS';
export const UPDATE_SCHEDULE_ERROR = 'UPDATE_SCHEDULE_ERROR';

export const UPDATE_PERMISSION_REQUEST = 'UPDATE_PERMISSION_REQUEST';
export const UPDATE_PERMISSION_SUCCESS = 'UPDATE_PERMISSION_SUCCESS';
export const UPDATE_PERMISSION_ERROR = 'UPDATE_PERMISSION_ERROR';

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
    case LOAD_SCHEDULES_REQUEST:
      draft.loadSchedulesLoading = true;
      draft.loadSchedulesDone = false;
      draft.loadSchedulesError = null;
      break;
    case LOAD_SCHEDULES_SUCCESS:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesDone = true;
      draft.loadSchedulesError = null;
      draft.schedules = action.data.map((item) => {
        console.log('date', new Date(item));
        return ({
          id: item.id,
          start: new Date(item.startDate),
          end: new Date(item.endDate),
          nickname: item.Friend.nickname,
          address: item.Gym.address,
          description: item.description,
          friend: item.Friend,
        });
      });
      break;
    case LOAD_SCHEDULES_ERROR:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesDone = false;
      draft.loadSchedulesError = action.error;
      break;
    case LOAD_SCHEDULE_REQUEST:
      draft.loadScheduleLoading = true;
      draft.loadScheduleDone = false;
      draft.loadScheduleError = null;
      break;
    case LOAD_SCHEDULE_SUCCESS:
      draft.loadScheduleLoading = false;
      draft.loadScheduleDone = true;
      draft.loadScheduleError = null;
      draft.schedule = {
        id: action.data.id,
        start: new Date(action.data.startDate),
        end: new Date(action.data.endDate),
        nickname: action.data.Friend.nickname,
        address: action.data.Gym.address,
        description: action.data.description,
        friend: action.data.Friend,
      };
      break;
    case LOAD_SCHEDULE_ERROR:
      draft.loadScheduleLoading = false;
      draft.loadScheduleDone = false;
      draft.loadScheduleError = action.error;
      break;
    case UPDATE_SCHEDULE_REQUEST:
      draft.updateScheduleLoading = true;
      draft.updateScheduleDone = false;
      draft.updateScheduleError = null;
      break;
    case UPDATE_SCHEDULE_SUCCESS:
      draft.updateScheduleLoading = false;
      draft.updateScheduleDone = true;
      draft.updateScheduleError = null;
      draft.schedule = null;
      draft.schedules = draft.schedules.map((item) => (
        item.id === action.data.id ? action.data : item
      ));
      break;
    case UPDATE_SCHEDULE_ERROR:
      draft.updateScheduleLoading = false;
      draft.updateScheduleDone = false;
      draft.updateScheduleError = action.error;
      break;
    case UPDATE_PERMISSION_REQUEST:
      draft.updatePermissionLoading = true;
      draft.updatePermissionDone = false;
      draft.updatePermissionError = null;
      break;
    case UPDATE_PERMISSION_SUCCESS:
      draft.updatePermissionLoading = false;
      draft.updatePermissionDone = true;
      draft.updatePermissionError = null;
      draft.schedule = null;
      draft.schedules = draft.schedules.filter((item) => item.id !== action.data.id);
      break;
    case UPDATE_PERMISSION_ERROR:
      draft.updatePermissionLoading = false;
      draft.updatePermissionDone = false;
      draft.updatePermissionError = action.error;
      break;
    default:
      break;
  }
}));

export default reducer;
