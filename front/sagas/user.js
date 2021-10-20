import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_MY_INFO_ERROR, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_ERROR,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_MY_DESCRIPTION_ERROR,
  UPDATE_MY_DESCRIPTION_REQUEST,
  UPDATE_MY_DESCRIPTION_SUCCESS,
  UPDATE_MY_FRIENDS_INFO_ERROR,
  UPDATE_MY_FRIENDS_INFO_REQUEST,
  UPDATE_MY_FRIENDS_INFO_SUCCESS,
  UPDATE_MY_INFO_ERROR,
  UPDATE_MY_INFO_REQUEST,
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_NICKNAME_ERROR,
  UPDATE_MY_NICKNAME_REQUEST,
  UPDATE_MY_NICKNAME_SUCCESS,
} from '../reducers/user';

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_ERROR,
      error: error.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: null,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_ERROR,
      error: error.response.data,
    });
  }
}

function signupAPI(data) {
  return axios.post('/user', data);
}

function* signup(action) {
  try {
    console.log('action', action.data);
    const result = yield call(signupAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyInfoAPI(data) {
  return axios.put('/user', data);
}

function* updateMyInfo(action) {
  try {
    const result = yield call(updateMyInfoAPI, action.data);
    yield put({
      type: UPDATE_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_MY_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyFriendsInfoAPI(data) {
  return axios.put('/user/detail', data);
}

function* updateMyFriendsInfo(action) {
  try {
    const result = yield call(updateMyFriendsInfoAPI, action.data);
    yield put({
      type: UPDATE_MY_FRIENDS_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_MY_FRIENDS_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyNicknameAPI(data) {
  return axios.patch('/user/nickname', data);
}

function* updateMyNickname(action) {
  try {
    const result = yield call(updateMyNicknameAPI, action.data);
    yield put({
      type: UPDATE_MY_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_MY_NICKNAME_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyDescriptionAPI(data) {
  return axios.patch('/user/description', data);
}

function* updateMyDescription(action) {
  try {
    const result = yield call(updateMyDescriptionAPI, action.data);
    yield put({
      type: UPDATE_MY_DESCRIPTION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_MY_DESCRIPTION_ERROR,
      error: error.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchUpdateMyInfo() {
  yield takeLatest(UPDATE_MY_INFO_REQUEST, updateMyInfo);
}

function* watchUpdateMyFriendsInfo() {
  yield takeLatest(UPDATE_MY_FRIENDS_INFO_REQUEST, updateMyFriendsInfo);
}

function* watchUpdateMyNickname() {
  yield takeLatest(UPDATE_MY_NICKNAME_REQUEST, updateMyNickname);
}

function* watchUpdateMyDescription() {
  yield takeLatest(UPDATE_MY_DESCRIPTION_REQUEST, updateMyDescription);
}

export default function* userSaga() {
  yield all([
    yield fork(watchLoadMyInfo),
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchSignUp),
    yield fork(watchUpdateMyInfo),
    yield fork(watchUpdateMyFriendsInfo),
    yield fork(watchUpdateMyNickname),
    yield fork(watchUpdateMyDescription),
  ]);
}
