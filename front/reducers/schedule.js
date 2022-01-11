import produce from 'immer';
import * as _ from 'lodash';

const initialState = {
  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
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
  schedules: [],
  schedulesCount: 0,
  schedule: null,
};

export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';

export const LOAD_SCHEDULES_REQUEST = 'LOAD_SCHEDULES_REQUEST';
export const LOAD_SCHEDULES_SUCCESS = 'LOAD_SCHEDULES_SUCCESS';
export const LOAD_SCHEDULES_ERROR = 'LOAD_SCHEDULES_ERROR';

export const LOAD_CALENDAR_SCHEDULES_REQUEST = 'LOAD_CALENDAR_SCHEDULES_REQUEST';
export const LOAD_CALENDAR_SCHEDULES_SUCCESS = 'LOAD_CALENDAR_SCHEDULES_SUCCESS';
export const LOAD_CALENDAR_SCHEDULES_ERROR = 'LOAD_CALENDAR_SCHEDULES_ERROR';

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
      draft.schedulesCount = 0;
      break;
    case LOAD_SCHEDULES_SUCCESS:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesDone = true;
      draft.loadSchedulesError = null;
      draft.schedules = action.data.schedules.map((item) => ({
        id: item.id,
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        address: item.Gym.address,
        description: item.description,
        friend: item.Friend,
        requester: item.Requester,
        isPermitted: item.isPermitted,
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
        id: item.id,
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        address: item.Gym.address,
        description: item.description,
        friend: item.Friend,
        requester: item.Requester,
        isPermitted: item.isPermitted,
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
      const friendMatchingInfo = [...action.data.friendReqRematchingInfo,
        ...action.data.friendResRematchingInfo];
      const userMatchingInfo = [...action.data.userReqRematchingInfo,
        ...action.data.userResRematchingInfo];
      let friendTotalCount = 0;
      let userTotalCount = 0;
      let friendRematchingCount = 0;
      let userRematchingCount = 0;
      let friendTotalMatching = {};
      let userTotalMatching = {};
      let friendRematching = {};
      let userRematching = {};

      friendMatchingInfo.forEach((matching) => {
        friendTotalCount += matching.count;
        if (friendTotalMatching[matching.FriendId]) {
          friendTotalMatching = {
            ...friendTotalMatching,
            ...{
              [matching.FriendId]: friendTotalMatching[matching.FriendId] + matching.count,
            } };
          return;
        }
        friendTotalMatching = {
          ...friendTotalMatching, ...{ [matching.FriendId]: matching.count } };
      });
      userMatchingInfo.forEach((matching) => {
        userTotalCount += matching.count;
        if (userTotalMatching[matching.FriendId]) {
          userTotalMatching = {
            ...userTotalMatching,
            ...{
              [matching.FriendId]: userTotalMatching[matching.FriendId] + matching.count,
            } };
          return;
        }
        userTotalMatching = {
          ...userTotalMatching, ...{ [matching.FriendId]: matching.count } };
      });
      _.forIn(userTotalMatching, (value, key) => {
        console.log(key);
        if (value >= 2) {
          userRematchingCount += value;
          userRematching = { ...userRematching, [key]: value };
        }
      });
      _.forIn(friendTotalMatching, (value, key) => {
        console.log(key);
        if (value >= 2) {
          friendRematchingCount += value;
          friendRematching = { ...friendRematching, [key]: value };
        }
      });
      draft.loadScheduleLoading = false;
      draft.loadScheduleDone = true;
      draft.loadScheduleError = null;
      draft.schedule = {
        id: action.data.schedule.id,
        start: new Date(action.data.schedule.startDate),
        end: new Date(action.data.schedule.endDate),
        nickname: action.data.schedule.Friend.nickname,
        address: action.data.schedule.Gym.address,
        description: action.data.schedule.description,
        friend: action.data.schedule.Friend,
        requester: action.data.schedule.Requester,
        friendTotalCount,
        userTotalCount,
        friendRematchingCount,
        userRematchingCount,
        friendRematching,
        userRematching,
        friendTotalMatching,
        userTotalMatching,
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
    default:
      break;
  }
}));

export default reducer;
