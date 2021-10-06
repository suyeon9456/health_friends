import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_GYM_ERROR,
  ADD_GYM_REQUEST,
  ADD_GYM_SUCCESS,
  LOAD_GYM_ERROR,
  LOAD_GYM_REQUEST,
  LOAD_GYM_SUCCESS,
} from '../reducers/gym';
import { SELECT_GYM } from '../reducers/user';

function addGymAPI(data) {
  return axios.post('http://localhost:6015/gym', data);
}

function* addGym(action) {
  try {
    const result = yield call(addGymAPI, action.data);
    yield put({
      type: ADD_GYM_SUCCESS,
      data: result.data,
    });
    yield put({
      type: SELECT_GYM,
      data: { id: result.data.id, name: result.data.name },
    });
  } catch (error) {
    yield put({
      type: ADD_GYM_ERROR,
      error: error.response.data,
    });
  }
}

function loadGymsAPI(data) {
  return axios.get('http://localhost:6015/gym', data);
}

function* loadGyms(action) {
  try {
    const result = yield call(loadGymsAPI, action.data);
    yield put({
      type: LOAD_GYM_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_GYM_ERROR,
      error: error.response.data,
    });
  }
}

function* watchAddGym() {
  yield takeLatest(ADD_GYM_REQUEST, addGym);
}

function* watchLoadGyms() {
  yield takeLatest(LOAD_GYM_REQUEST, loadGyms);
}

export default function* userSaga() {
  yield all([
    yield fork(watchAddGym),
    yield fork(watchLoadGyms),
    // yield fork(watchLoadMyInfo),
    // yield fork(watchLoadUser),
    // yield fork(watchLoadFollowings),
    // yield fork(watchLoadFollowers),
    // yield fork(watchFollow),
    // yield fork(watchUnFollow),
    // yield fork(watchRemoveFollower),
    // yield fork(watchChangeNickname),
  ]);
}
