import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { Schedule, ScheduleModel } from '../@types/schedule';
import { UpdateCancellationProps } from '../@types/action';
import {
  addScheduleRequest,
  addScheduleSuccess,
  addScheduleError,
  addReScheduleRequest,
  addReScheduleSuccess,
  addReScheduleError,
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
} from '../reducers/schedule';

function addScheduleAPI(data?: Schedule): Promise<AxiosResponse<Schedule>> {
  return axios.post('/schedule', data);
}

function* addSchedule(action: PayloadAction<Schedule>) {
  try {
    yield call(addScheduleAPI, action.payload);
    yield put(addScheduleSuccess());
  } catch (error: any) {
    yield put(addScheduleError(error.response.data));
  }
}

function addReScheduleAPI(data?: Schedule): Promise<AxiosResponse<Schedule>> {
  return axios.post('/schedule/re', data);
}

function* addReSchedule(action: PayloadAction<Schedule>) {
  try {
    yield call(addReScheduleAPI, action.payload);
    yield put(addReScheduleSuccess());
  } catch (error: any) {
    yield put(addReScheduleError(error.response.data));
  }
}

function updateScheduleAPI(data?: ScheduleModel): Promise<AxiosResponse<Schedule>> {
  return axios.put('/schedule', data);
}

function* updateSchedule(action: PayloadAction<ScheduleModel>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(updateScheduleAPI, action.payload);
    yield put(updateScheduleSuccess(result.data));
  } catch (error: any) {
    yield put(updateScheduleError(error.response.data));
  }
}

function updatePermissionAPI(data?: { scheduleId: number, permission: boolean }): Promise<AxiosResponse<Schedule>> {
  return axios.put('/schedule/permission', data);
}

function* updatePermission(action: PayloadAction<{ scheduleId: number, permission: boolean }>) {
  try {
    const result: AxiosResponse<Schedule> = yield call(updatePermissionAPI, action.payload);
    yield put(updatePermissionSuccess(result.data));
  } catch (error: any) {
    yield put(updatePermissionError(error.response.data));
  }
}

function addCancellationAPI(data?: { id: number }): Promise<AxiosResponse<Schedule>> {
  return axios.post('/schedule/cancel', data);
}

function* addCancellation(action: PayloadAction<{ id: number }>) {
  try {
    yield call(addCancellationAPI, action.payload);
    yield put(addCancellationSuccess());
  } catch (error: any) {
    yield put(addCancellationError(error.response.data));
  }
}

function updateCancellationAPI(data?: UpdateCancellationProps): Promise<AxiosResponse<Schedule>> {
  return axios.put('/schedule/cancel', data);
}

function* updateCancellation(action: PayloadAction<UpdateCancellationProps>) {
  try {
    yield call(updateCancellationAPI, action.payload);
    yield put(updateCancellationSuccess());
  } catch (error: any) {
    yield put(updateCancellationError(error.response.data));
  }
}

function* watchAddSchedule() {
  yield takeLatest(addScheduleRequest, addSchedule);
}

function* watchAddReSchedule() {
  yield takeLatest(addReScheduleRequest, addReSchedule);
}

function* watchUpdateSchedule() {
  yield takeLatest(updateScheduleRequest, updateSchedule);
}

function* watchUpdatePermission() {
  yield takeLatest(updatePermissionRequest, updatePermission);
}

function* watchAddCancellation() {
  yield takeLatest(addCancellationRequest, addCancellation);
}

function* watchUpdateCancellation() {
  yield takeLatest(updateCancellationRequest, updateCancellation);
}

export default function* userSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchAddSchedule),
    yield fork(watchAddReSchedule),
    yield fork(watchUpdateSchedule),
    yield fork(watchUpdatePermission),
    yield fork(watchAddCancellation),
    yield fork(watchUpdateCancellation),
  ]);
}
