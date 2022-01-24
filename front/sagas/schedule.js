import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_CANCELLATION_ERROR, ADD_CANCELLATION_REQUEST, ADD_CANCELLATION_SUCCESS, ADD_RE_SCHEDULE_ERROR, ADD_RE_SCHEDULE_REQUEST, ADD_RE_SCHEDULE_SUCCESS, ADD_SCHEDULE_ERROR, ADD_SCHEDULE_REQUEST, ADD_SCHEDULE_SUCCESS, LOAD_CALENDAR_SCHEDULES_ERROR, LOAD_CALENDAR_SCHEDULES_REQUEST, LOAD_CALENDAR_SCHEDULES_SUCCESS, LOAD_SCHEDULES_ERROR, LOAD_SCHEDULES_REQUEST, LOAD_SCHEDULES_SUCCESS, LOAD_SCHEDULE_ERROR, LOAD_SCHEDULE_REQUEST, LOAD_SCHEDULE_SUCCESS, UPDATE_CANCELLATION_ERROR, UPDATE_CANCELLATION_REQUEST, UPDATE_CANCELLATION_SUCCESS, UPDATE_PERMISSION_ERROR, UPDATE_PERMISSION_REQUEST, UPDATE_PERMISSION_SUCCESS, UPDATE_SCHEDULE_ERROR, UPDATE_SCHEDULE_REQUEST, UPDATE_SCHEDULE_SUCCESS } from '../reducers/schedule';

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

function addReScheduleAPI(data) {
  return axios.post('/schedule/re', data);
}

function* addReSchedule(action) {
  try {
    const result = yield call(addReScheduleAPI, action.data);
    yield put({
      type: ADD_RE_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_RE_SCHEDULE_ERROR,
      error: error.response.data,
    });
  }
}

function loadSchedulesAPI(data) {
  if (data.profileMenu === 'calendar') {
    return axios.get(`/schedules?profileMenu=${data.profileMenu}`);
  }
  const statusquery = data.status.length < 1 ? '' : `&${data.status.map((m) => `${m}=true`).join('&')}`;
  const termquery = data.term.length < 1 ? '' : `&${data.term.map((m) => `${m}=true`).join('&')}`;
  const typequery = data.type.length < 1 ? '' : `&${data.type.map((m) => `${m}=true`).join('&')}`;
  return axios.get(`/schedules?profileMenu=${data.profileMenu}&limit=${data?.limit}&rejectedMatching=${data?.rejectedMatching}${termquery}${typequery}${statusquery}`);
}

function* loadSchedules(action) {
  try {
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

function loadCalendarSchedulesAPI(data) {
  return axios.get(`/schedules/calendar?start=${data.start}&end=${data.end}`);
}

function* loadCalendarSchedules(action) {
  try {
    const result = yield call(loadCalendarSchedulesAPI, action.data);
    yield put({
      type: LOAD_CALENDAR_SCHEDULES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_CALENDAR_SCHEDULES_ERROR,
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

function updatePermissionAPI(data) {
  return axios.put('/schedule/permission', data);
}

function* updatePermission(action) {
  try {
    const result = yield call(updatePermissionAPI, action.data);
    yield put({
      type: UPDATE_PERMISSION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_PERMISSION_ERROR,
      error: error.response.data,
    });
  }
}

function addCancellationAPI(data) {
  return axios.post('/schedule/cancel', data);
}

function* addCancellation(action) {
  try {
    const result = yield call(addCancellationAPI, action.data);
    yield put({
      type: ADD_CANCELLATION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_CANCELLATION_ERROR,
      error: error.response.data,
    });
  }
}

function updateCancellationAPI(data) {
  return axios.put('/schedule/cancel', data);
}

function* updateCancellation(action) {
  try {
    const result = yield call(updateCancellationAPI, action.data);
    yield put({
      type: UPDATE_CANCELLATION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
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

export default function* userSaga() {
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
