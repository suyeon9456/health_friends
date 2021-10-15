import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_GYM_ERROR,
  ADD_GYM_REQUEST,
  ADD_GYM_SUCCESS,
  LOAD_FRIENDS_ERROR,
  LOAD_FRIENDS_REQUEST,
  LOAD_FRIENDS_SUCCESS,
  LOAD_GYM_ERROR,
  LOAD_GYM_REQUEST,
  LOAD_GYM_SUCCESS,
} from '../reducers/gym';
import { SELECT_GYM } from '../reducers/user';

function addGymAPI(data) {
  return axios.post('/gym', data);
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

function loadGymsAPI(lastId, data) {
  return axios.get(`/gyms?lastId=${lastId || 0}&searchWord=${data.searchWord || ''}&swLon=${data.swLon}&swLat=${data.swLon}&neLon=${data.neLon}&neLat=${data.neLon}`);
}

function* loadGyms(action) {
  try {
    const result = yield call(loadGymsAPI, action.lastId, action.data);
    yield put({
      type: LOAD_GYM_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_GYM_ERROR,
      error: error.response.data,
    });
  }
}

function loadFriendsAPI(lastId, data) {
  return axios.get(`/gym/${data.gymId || 0}?lastId=${lastId || 0}`);
}

function* loadFriends(action) {
  console.log(action.data);
  try {
    const result = yield call(loadFriendsAPI, action.lastId, action.data);
    yield put({
      type: LOAD_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FRIENDS_ERROR,
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

function* watchLoadFriends() {
  yield takeLatest(LOAD_FRIENDS_REQUEST, loadFriends);
}

export default function* userSaga() {
  yield all([
    yield fork(watchAddGym),
    yield fork(watchLoadGyms),
    yield fork(watchLoadFriends),
    // yield fork(watchLoadUser),
    // yield fork(watchLoadFollowings),
    // yield fork(watchLoadFollowers),
    // yield fork(watchFollow),
    // yield fork(watchUnFollow),
    // yield fork(watchRemoveFollower),
    // yield fork(watchChangeNickname),
  ]);
}
