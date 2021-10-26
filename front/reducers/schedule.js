import produce from 'immer';
import { parse } from 'date-fns';
import { ko } from 'date-fns/locale';

const initialState = {
  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
  loadScheduleLoading: false,
  loadScheduleDone: false,
  loadScheduleError: null,
  schedules: [],
};

export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';

export const LOAD_SCHEDULE_REQUEST = 'LOAD_SCHEDULE_REQUEST';
export const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
export const LOAD_SCHEDULE_ERROR = 'LOAD_SCHEDULE_ERROR';

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
    case LOAD_SCHEDULE_REQUEST:
      draft.loadGymLoading = true;
      draft.loadGymDone = false;
      draft.loadGymError = null;
      break;
    case LOAD_SCHEDULE_SUCCESS:
      draft.loadGymLoading = false;
      draft.loadGymDone = true;
      draft.loadGymError = null;
      draft.schedules = action.data.map((schedule) => ({
        start: parse(schedule.date, 'yyyy/MM/dd kk:mm:ss', new Date(), { locale: ko }),
        end: parse(schedule.date, 'yyyy/MM/dd kk:mm:ss', new Date(), { locale: ko }),
        nickname: schedule.Friend.nickname,
        address: schedule.Gym.address,
      }));
      break;
    case LOAD_SCHEDULE_ERROR:
      draft.loadGymLoading = false;
      draft.loadGymDone = false;
      draft.loadGymError = draft.error;
      break;
    default:
      break;
  }
}));

export default reducer;
