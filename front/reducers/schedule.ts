import produce from 'immer';
import {
  ADD_CANCELLATION_ERROR,
  ADD_CANCELLATION_REQUEST,
  ADD_CANCELLATION_SUCCESS,
  ADD_RE_SCHEDULE_ERROR,
  ADD_RE_SCHEDULE_REQUEST,
  ADD_RE_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_ERROR,
  ADD_SCHEDULE_REQUEST,
  ADD_SCHEDULE_SUCCESS,
  LOAD_CALENDAR_SCHEDULES_ERROR,
  LOAD_CALENDAR_SCHEDULES_REQUEST,
  LOAD_CALENDAR_SCHEDULES_SUCCESS,
  LOAD_SCHEDULES_ERROR,
  LOAD_SCHEDULES_REQUEST,
  LOAD_SCHEDULES_SUCCESS,
  LOAD_SCHEDULE_ERROR,
  LOAD_SCHEDULE_REQUEST,
  LOAD_SCHEDULE_SUCCESS,
  UPDATE_CANCELLATION_ERROR,
  UPDATE_CANCELLATION_REQUEST,
  UPDATE_CANCELLATION_SUCCESS,
  UPDATE_PERMISSION_ERROR,
  UPDATE_PERMISSION_REQUEST,
  UPDATE_PERMISSION_SUCCESS,
  UPDATE_SCHEDULE_ERROR,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
} from '../@types/utils';
import { ScheduleInitialState } from '../@types/reducer/state';
import { ScheduleActions } from '../@types/action';

const initialState: ScheduleInitialState = {
  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
  addReScheduleLoading: false,
  addReScheduleDone: false,
  addReScheduleError: null,
  loadSchedulesLoading: false,
  loadSchedulesDone: false,
  loadSchedulesError: null,
  loadCalendarSchedulesLoading: false,
  loadCalendarSchedulesDone: false,
  loadCalendarSchedulesError: null,
  loadScheduleLoading: false,
  loadScheduleDone: false,
  loadScheduleError: null,
  updateScheduleLoading: false,
  updateScheduleDone: false,
  updateScheduleError: null,
  updatePermissionLoading: false,
  updatePermissionDone: false,
  updatePermissionError: null,
  addCancellationLoading: false,
  addCancellationDone: false,
  addCancellationError: null,
  updateCancellationLoading: false,
  updateCancellationDone: false,
  updateCancellationError: null,
  addPermissionLoading: false,
  addPermissionDone: false,
  addPermissionError: null,
  schedules: [],
  schedulesCount: 0,
  schedule: null,
};

const reducer = (state = initialState, action: ScheduleActions) => (produce(state, (draft) => {
  switch (action.type) {
    case ADD_SCHEDULE_REQUEST:
      draft.addScheduleLoading = true;
      draft.addScheduleDone = false;
      draft.addScheduleError = null;
      break;
    case ADD_SCHEDULE_SUCCESS:
      draft.addScheduleLoading = false;
      draft.addScheduleDone = true;
      draft.addScheduleError = null;
      break;
    case ADD_SCHEDULE_ERROR:
      draft.addScheduleLoading = false;
      draft.addScheduleDone = false;
      draft.addScheduleError = action.error;
      break;
    case ADD_RE_SCHEDULE_REQUEST:
      draft.addReScheduleLoading = true;
      draft.addReScheduleDone = false;
      draft.addReScheduleError = null;
      break;
    case ADD_RE_SCHEDULE_SUCCESS:
      draft.addReScheduleLoading = false;
      draft.addReScheduleDone = true;
      draft.addReScheduleError = null;
      break;
    case ADD_RE_SCHEDULE_ERROR:
      draft.addReScheduleLoading = false;
      draft.addReScheduleDone = false;
      draft.addReScheduleError = action.error;
      break;
    case LOAD_SCHEDULES_REQUEST:
      draft.loadSchedulesLoading = true;
      draft.loadSchedulesDone = false;
      draft.loadSchedulesError = null;
      draft.schedulesCount = 0;
      break;
    case LOAD_SCHEDULES_SUCCESS:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesDone = true;
      draft.loadSchedulesError = null;
      draft.schedules = action.data.schedules.map((item) => ({
        ...item,
        start: new Date(item?.startDate),
        end: new Date(item?.endDate),
        address: item.Gym.address,
        gym: item.Gym.name,
      }));
      draft.schedulesCount = action.data.count;
      break;
    case LOAD_SCHEDULES_ERROR:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesDone = false;
      draft.loadSchedulesError = action.error;
      break;
    case LOAD_CALENDAR_SCHEDULES_REQUEST:
      draft.loadCalendarSchedulesLoading = true;
      draft.loadCalendarSchedulesDone = false;
      draft.loadCalendarSchedulesError = null;
      draft.schedulesCount = 0;
      break;
    case LOAD_CALENDAR_SCHEDULES_SUCCESS:
      draft.loadCalendarSchedulesLoading = false;
      draft.loadCalendarSchedulesDone = true;
      draft.loadCalendarSchedulesError = null;
      draft.schedules = action.data.map((item) => ({
        ...item,
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        address: item.Gym.address,
        gymName: item.Gym.name,
      }));
      break;
    case LOAD_CALENDAR_SCHEDULES_ERROR:
      draft.loadCalendarSchedulesLoading = false;
      draft.loadCalendarSchedulesDone = false;
      draft.loadCalendarSchedulesError = action.error;
      break;
    case LOAD_SCHEDULE_REQUEST:
      draft.loadScheduleLoading = true;
      draft.loadScheduleDone = false;
      draft.loadScheduleError = null;
      break;
    case LOAD_SCHEDULE_SUCCESS: {
      const { schedule, userMatching, friendMatching } = action.data;
      const userTotalCount = userMatching.length > 0 ? userMatching[0].matchingCount : 0;
      const userReCount = userMatching.length > 0 ? userMatching[0].rematchingCount : 0;
      const friendTotalCount = friendMatching.length > 0 ? friendMatching[0].matchingCount : 0;
      const friendReCount = friendMatching.length > 0 ? friendMatching[0].rematchingCount : 0;
      draft.loadScheduleLoading = false;
      draft.loadScheduleDone = true;
      draft.loadScheduleError = null;
      draft.schedule = {
        ...schedule,
        start: new Date(schedule.startDate),
        end: new Date(schedule.endDate),
        nickname: schedule.Friend.nickname,
        address: schedule.Gym.address,
        gymId: schedule.Gym.id,
        gymName: schedule.Gym.name,
        userMathcing: userMatching.map(({ FriendId }) => FriendId),
        userTotalCount,
        userReCount,
        friendMathcing: friendMatching.map(({ FriendId }) => FriendId),
        friendTotalCount,
        friendReCount,
      };
      break;
    }
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
    case ADD_CANCELLATION_REQUEST:
      draft.addPermissionLoading = true;
      draft.addPermissionDone = false;
      draft.addPermissionError = null;
      break;
    case ADD_CANCELLATION_SUCCESS:
      draft.addPermissionLoading = false;
      draft.addPermissionDone = true;
      draft.addPermissionError = null;
      break;
    case ADD_CANCELLATION_ERROR:
      draft.addPermissionLoading = false;
      draft.addPermissionDone = false;
      draft.addPermissionError = action.error;
      break;
    case UPDATE_CANCELLATION_REQUEST:
      draft.updatePermissionLoading = true;
      draft.updatePermissionDone = false;
      draft.updatePermissionError = null;
      break;
    case UPDATE_CANCELLATION_SUCCESS:
      draft.updatePermissionLoading = false;
      draft.updatePermissionDone = true;
      draft.updatePermissionError = null;
      break;
    case UPDATE_CANCELLATION_ERROR:
      draft.updatePermissionLoading = false;
      draft.updatePermissionDone = false;
      draft.updatePermissionError = action.error;
      break;
    default:
      break;
  }
}));

export default reducer;
