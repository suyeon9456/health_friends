import { ScheduleInitialState } from '../@types/reducer/state';
import { LoadSchedulesProps } from '../@types/action';
import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schedule, Schedules } from '../@types/schedule';
import { RootState } from '../store/configureStore';

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

const scheduleSlice = createSlice({
  name: 'SCHEDULE',
  initialState,
  reducers: {
    addScheduleRequest(state, action) {
      state.addScheduleLoading = true;
      state.addScheduleDone = false;
      state.addScheduleError = null;
    },
    addScheduleSuccess(state) {
      state.addScheduleLoading = false;
      state.addScheduleDone = true;
      state.addScheduleError = null;
    },
    addScheduleError(state, action) {
      state.addScheduleLoading = false;
      state.addScheduleDone = false;
      state.addScheduleError = action.payload;
    },
    addReScheduleRequest(state, action) {
      state.addReScheduleLoading = true;
      state.addReScheduleDone = false;
      state.addReScheduleError = null;
    },
    addReScheduleSuccess(state) {
      state.addReScheduleLoading = false;
      state.addReScheduleDone = true;
      state.addReScheduleError = null;
    },
    addReScheduleError(state, action) {
      state.addReScheduleLoading = false;
      state.addReScheduleDone = false;
      state.addReScheduleError = action.payload;
    },
    loadSchedulesRequest(state, action: PayloadAction<LoadSchedulesProps>) {
      state.loadSchedulesLoading = true;
      state.loadSchedulesDone = false;
      state.loadSchedulesError = null;
      state.schedulesCount = 0;
    },
    loadSchedulesSuccess(state, action: PayloadAction<{ schedules: Schedules; count: number }>) {
      state.loadSchedulesLoading = false;
      state.loadSchedulesDone = true;
      state.loadSchedulesError = null;
      state.schedules = action.payload.schedules.map((item) => ({
        ...item,
        start: new Date(item?.startDate),
        end: new Date(item?.endDate),
        address: item.Gym.address,
        gym: item.Gym.name,
      }));
      state.schedulesCount = action.payload.count;
    },
    loadSchedulesError(state, action) {
      state.loadSchedulesLoading = false;
      state.loadSchedulesDone = false;
      state.loadSchedulesError = action.payload;
    },
    loadCalendarSchedulesRequest(state, action) {
      state.loadCalendarSchedulesLoading = true;
      state.loadCalendarSchedulesDone = false;
      state.loadCalendarSchedulesError = null;
      state.schedulesCount = 0;
    },
    loadCalendarSchedulesSuccess(state, action) {
      state.loadCalendarSchedulesLoading = false;
      state.loadCalendarSchedulesDone = true;
      state.loadCalendarSchedulesError = null;
      state.schedules = action.payload.map((item: Schedule) => ({
        ...item,
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        address: item.Gym.address,
        gymName: item.Gym.name,
      }));
    },
    loadCalendarSchedulesError(state, action) {
      state.loadCalendarSchedulesLoading = false;
      state.loadCalendarSchedulesDone = false;
      state.loadCalendarSchedulesError = action.payload;
    },
    loadScheduleRequest(state, action) {
      state.loadScheduleLoading = true;
      state.loadScheduleDone = false;
      state.loadScheduleError = null;
    },
    loadScheduleSuccess(state, action) {
      const { schedule, userMatching, friendMatching } = action.payload;
      const userTotalCount = userMatching.length > 0 ? userMatching[0].matchingCount : 0;
      const userReCount = userMatching.length > 0 ? userMatching[0].rematchingCount : 0;
      const friendTotalCount = friendMatching.length > 0 ? friendMatching[0].matchingCount : 0;
      const friendReCount = friendMatching.length > 0 ? friendMatching[0].rematchingCount : 0;
      state.loadScheduleLoading = false;
      state.loadScheduleDone = true;
      state.loadScheduleError = null;
      state.schedule = {
        ...schedule,
        start: new Date(schedule.startDate),
        end: new Date(schedule.endDate),
        nickname: schedule?.Friend?.nickname,
        address: schedule.Gym.address,
        gymId: schedule.Gym.id,
        gymName: schedule.Gym.name,
        userMathcing: userMatching.map(({ FriendId }: { FriendId: number }) => FriendId),
        userTotalCount,
        userReCount,
        friendMathcing: friendMatching.map(({ FriendId }: { FriendId: number }) => FriendId),
        friendTotalCount,
        friendReCount,
      };
    },
    loadScheduleError(state, action) {
      state.loadScheduleLoading = false;
      state.loadScheduleDone = false;
      state.loadScheduleError = action.payload;
    },
    updateScheduleRequest(state, action) {
      state.updateScheduleLoading = true;
      state.updateScheduleDone = false;
      state.updateScheduleError = null;
    },
    updateScheduleSuccess(state, action) {
      state.updateScheduleLoading = false;
      state.updateScheduleDone = true;
      state.updateScheduleError = null;
      state.schedule = null;
      state.schedules = state.schedules.map((item) => (
        item.id === action.payload.id ? action.payload : item
      ));
    },
    updateScheduleError(state, action) {
      state.updateScheduleLoading = false;
      state.updateScheduleDone = false;
      state.updateScheduleError = action.payload;
    },
    updatePermissionRequest(state, action) {
      state.updatePermissionLoading = true;
      state.updatePermissionDone = false;
      state.updatePermissionError = null;
    },
    updatePermissionSuccess(state, action) {
      state.updatePermissionLoading = false;
      state.updatePermissionDone = true;
      state.updatePermissionError = null;
      state.schedule = null;
      state.schedules = state.schedules.filter((item) => item.id !== action.payload.id);
    },
    updatePermissionError(state, action) {
      state.updatePermissionLoading = false;
      state.updatePermissionDone = false;
      state.updatePermissionError = action.payload;
    },
    addCancellationRequest(state, action) {
      state.addPermissionLoading = true;
      state.addPermissionDone = false;
      state.addPermissionError = null;
    },
    addCancellationSuccess(state) {
      state.addPermissionLoading = false;
      state.addPermissionDone = true;
      state.addPermissionError = null;
    },
    addCancellationError(state, action) {
      state.addPermissionLoading = false;
      state.addPermissionDone = false;
      state.addPermissionError = action.payload;
    },
    updateCancellationRequest(state, action) {
      state.updatePermissionLoading = true;
      state.updatePermissionDone = false;
      state.updatePermissionError = null;
    },
    updateCancellationSuccess(state) {
      state.updatePermissionLoading = false;
      state.updatePermissionDone = true;
      state.updatePermissionError = null;
    },
    updateCancellationError(state, action) {
      state.updatePermissionLoading = false;
      state.updatePermissionDone = false;
      state.updatePermissionError = action.payload;
    },
  },
});

export const scheduleSelector = createDraftSafeSelector(
  (state: RootState) => state.schedule.schedules,
  (state: RootState) => state.schedule.schedulesCount,
  (state: RootState) => state.schedule.schedule,
  (state: RootState) => state.schedule.addScheduleDone,
  (
    schedules,
    schedulesCount,
    schedule,
    addScheduleDone,
  ) => ({
    schedules,
    schedulesCount,
    schedule,
    addScheduleDone,
  })
);

export const {
  addScheduleRequest,
  addScheduleSuccess,
  addScheduleError,
  addReScheduleRequest,
  addReScheduleSuccess,
  addReScheduleError,
  loadSchedulesRequest,
  loadSchedulesSuccess,
  loadSchedulesError,
  loadCalendarSchedulesRequest,
  loadCalendarSchedulesSuccess,
  loadCalendarSchedulesError,
  loadScheduleRequest,
  loadScheduleSuccess,
  loadScheduleError,
  updateScheduleRequest,
  updateScheduleSuccess,
  updateScheduleError,
  updatePermissionRequest,
  updatePermissionSuccess,
  updatePermissionError,
  addCancellationRequest,
  addCancellationSuccess,
  addCancellationError,
  updateCancellationRequest,
  updateCancellationSuccess,
  updateCancellationError,
} = scheduleSlice.actions
export default scheduleSlice.reducer;

