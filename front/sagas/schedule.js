import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_SCHEDULE_ERROR, ADD_SCHEDULE_REQUEST, ADD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_ERROR, LOAD_SCHEDULE_REQUEST, LOAD_SCHEDULE_SUCCESS } from '../reducers/schedule';

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

function loadScheduleAPI(data) {
  return axios.get(`/schedules?type=${data.type || 'scheduledRecord'}&limit=${data.limit}`);
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

function* watchAddGym() {
  yield takeLatest(ADD_SCHEDULE_REQUEST, addSchedule);
}

function* watchLoadGym() {
  yield takeLatest(LOAD_SCHEDULE_REQUEST, loadSchedule);
}

export default function* userSaga() {
  yield all([
    yield fork(watchAddGym),
    yield fork(watchLoadGym),
  ]);
}
