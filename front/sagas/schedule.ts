import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';

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
  UPDATE_SCHEDULE_SUCCESS
} from '../@types/utils';
import { Schedule, ScheduleModel, Schedules } from '../@types/schedule';
import { ActionType, LoadSchedulesProps, UpdateCancellationProps } from '../@types/action';

function addScheduleAPI(data?: Schedule): Promise<AxiosResponse<Schedule>> {
  return axios.post('/schedule', data);
}

function* addSchedule(action: ActionType<typeof ADD_SCHEDULE_REQUEST, Schedule>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(addScheduleAPI, action.data);
    yield put({
      type: ADD_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: ADD_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function addReScheduleAPI(data?: Schedule): Promise<AxiosResponse<Schedule>> {
  return axios.post('/schedule/re', data);
}

function* addReSchedule(action: ActionType<typeof ADD_RE_SCHEDULE_REQUEST, Schedule>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(addReScheduleAPI, action.data);
    yield put({
      type: ADD_RE_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: ADD_RE_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function loadSchedulesAPI(data?: LoadSchedulesProps): Promise<AxiosResponse<{ schedules: Schedules; count: number }>> {
  if (data?.profileMenu === 'calendar') {
    return axios.get(`/schedules?profileMenu=${data?.profileMenu}`);
  }
  const statusquery = _.isEmpty(data?.status) && `&${data?.status.map((m) => `${m}=true`).join('&')}`;
  const termquery = _.isEmpty(data?.term) && `&${data?.term.map((m) => `${m}=true`).join('&')}`;
  const typequery = _.isEmpty(data?.type) && `&${data?.type.map((m) => `${m}=true`).join('&')}`;
  return axios.get(`/schedules?profileMenu=${data?.profileMenu}&limit=${data?.limit}&rejectedMatching=${data?.rejectedMatching}${termquery}${typequery}${statusquery}`);
}

function* loadSchedules(action: ActionType<typeof LOAD_SCHEDULES_REQUEST, LoadSchedulesProps>) {
  try {
    const result: AxiosResponse<{ schedules: Schedules; count: number }> = yield call(loadSchedulesAPI, action.data);
    yield put({
      type: LOAD_SCHEDULES_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_SCHEDULES_ERROR,
      error: error.response.data,
    });
  }
}

function loadCalendarSchedulesAPI(data?: { start: string; end: string }): Promise<AxiosResponse<Schedules>> {
  return axios.get(`/schedules/calendar?start=${data?.start}&end=${data?.end}`);
}

function* loadCalendarSchedules(action: ActionType<typeof LOAD_CALENDAR_SCHEDULES_REQUEST, { start: string; end: string }>) {
  try {
    const result: AxiosResponse<Schedules> = yield call(loadCalendarSchedulesAPI, action.data);
    yield put({
      type: LOAD_CALENDAR_SCHEDULES_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_CALENDAR_SCHEDULES_ERROR,
      error: error.response.data,
    });
  }
}

function loadScheduleAPI(data?: number): Promise<AxiosResponse<Schedule>> {
  return axios.get(`/schedule/${data}`);
}

function* loadSchedule(action: ActionType<typeof LOAD_SCHEDULE_REQUEST, number>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(loadScheduleAPI, action.data);
    yield put({
      type: LOAD_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function updateScheduleAPI(data?: ScheduleModel): Promise<AxiosResponse<Schedule>> {
  return axios.put('/schedule', data);
}

function* updateSchedule(action: ActionType<typeof UPDATE_PERMISSION_REQUEST, ScheduleModel>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(updateScheduleAPI, action.data);
    yield put({
      type: UPDATE_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function updatePermissionAPI(data?: { scheduleId: number, permission: boolean }): Promise<AxiosResponse<Schedule>> {
  return axios.put('/schedule/permission', data);
}

function* updatePermission(action: ActionType<typeof UPDATE_PERMISSION_REQUEST, { scheduleId: number, permission: boolean }>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(updatePermissionAPI, action.data);
    yield put({
      type: UPDATE_PERMISSION_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_PERMISSION_ERROR,
      error: error.response.data,
    });
  }
}

function addCancellationAPI(data?: { id: number }): Promise<AxiosResponse<Schedule>> {
  return axios.post('/schedule/cancel', data);
}

function* addCancellation(action: ActionType<typeof ADD_CANCELLATION_REQUEST, { id: number }>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(addCancellationAPI, action.data);
    yield put({
      type: ADD_CANCELLATION_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: ADD_CANCELLATION_ERROR,
      error: error.response.data,
    });
  }
}

function updateCancellationAPI(data?: UpdateCancellationProps): Promise<AxiosResponse<Schedule>> {
  return axios.put('/schedule/cancel', data);
}

function* updateCancellation(action: ActionType<typeof UPDATE_CANCELLATION_REQUEST, UpdateCancellationProps>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(updateCancellationAPI, action.data);
    yield put({
      type: UPDATE_CANCELLATION_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_CANCELLATION_ERROR,
      error: error.response.data,
    });
  }
}

function* watchAddSchedule() {
  yield takeLatest(ADD_SCHEDULE_REQUEST, addSchedule);
}

function* watchAddReSchedule() {
  yield takeLatest(ADD_RE_SCHEDULE_REQUEST, addReSchedule);
}

function* watchLoadSchedules() {
  yield takeLatest(LOAD_SCHEDULES_REQUEST, loadSchedules);
}

function* watchLoadCalendarSchedules() {
  yield takeLatest(LOAD_CALENDAR_SCHEDULES_REQUEST, loadCalendarSchedules);
}

function* watchLoadSchedule() {
  yield takeLatest(LOAD_SCHEDULE_REQUEST, loadSchedule);
}

function* watchUpdateSchedule() {
  yield takeLatest(UPDATE_SCHEDULE_REQUEST, updateSchedule);
}

function* watchUpdatePermission() {
  yield takeLatest(UPDATE_PERMISSION_REQUEST, updatePermission);
}

function* watchAddCancellation() {
  yield takeLatest(ADD_CANCELLATION_REQUEST, addCancellation);
}

function* watchUpdateCancellation() {
  yield takeLatest(UPDATE_CANCELLATION_REQUEST, updateCancellation);
}

export default function* userSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchAddSchedule),
    yield fork(watchAddReSchedule),
    yield fork(watchLoadSchedules),
    yield fork(watchLoadCalendarSchedules),
    yield fork(watchLoadSchedule),
    yield fork(watchUpdateSchedule),
    yield fork(watchUpdatePermission),
    yield fork(watchAddCancellation),
    yield fork(watchUpdateCancellation),
  ]);
}
