import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_SCHEDULE_ERROR, ADD_SCHEDULE_REQUEST, ADD_SCHEDULE_SUCCESS, LOAD_SCHEDULES_ERROR, LOAD_SCHEDULES_REQUEST, LOAD_SCHEDULES_SUCCESS, LOAD_SCHEDULE_ERROR, LOAD_SCHEDULE_REQUEST, LOAD_SCHEDULE_SUCCESS, UPDATE_SCHEDULE_ERROR, UPDATE_SCHEDULE_REQUEST, UPDATE_SCHEDULE_SUCCESS } from '../reducers/schedule';

function addScheduleAPI(data) {
  return axios.post('/schedule', data);
}

function* addSchedule(action) {
  try {
    const result = yield call(addScheduleAPI, action.data);
    yield put({
      type: ADD_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function loadSchedulesAPI(data) {
  return axios.get(`/schedules?type=${data.type || 'scheduledRecord'}&limit=${data.limit}`);
}

function* loadSchedules(action) {
  try {
    console.log('load');
    const result = yield call(loadSchedulesAPI, action.data);
    yield put({
      type: LOAD_SCHEDULES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_SCHEDULES_ERROR,
      error: error.response.data,
    });
  }
}

function loadScheduleAPI(data) {
  return axios.get(`/schedule/${data}`);
}

function* loadSchedule(action) {
  try {
    const result = yield call(loadScheduleAPI, action.data);
    yield put({
      type: LOAD_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function updateScheduleAPI(data) {
  return axios.put('/schedule', data);
}

function* updateSchedule(action) {
  try {
    const result = yield call(updateScheduleAPI, action.data);
    yield put({
      type: UPDATE_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function* watchAddGym() {
  yield takeLatest(ADD_SCHEDULE_REQUEST, addSchedule);
}

function* watchLoadSchedules() {
  yield takeLatest(LOAD_SCHEDULES_REQUEST, loadSchedules);
}

function* watchLoadSchedule() {
  yield takeLatest(LOAD_SCHEDULE_REQUEST, loadSchedule);
}

function* watchUpdateSchedule() {
  yield takeLatest(UPDATE_SCHEDULE_REQUEST, updateSchedule);
}

export default function* userSaga() {
  yield all([
    yield fork(watchAddGym),
    yield fork(watchLoadSchedules),
    yield fork(watchLoadSchedule),
    yield fork(watchUpdateSchedule),
  ]);
}
