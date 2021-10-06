import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { LOG_IN_ERROR,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

function loadMyInfoAPI(data) {
  // const result = axios.get('/user', data);
  const result = {
    email: data.email,
    nickname: 'suyeon cho',
  };
  return result;
}

function* login(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    console.log('result', result);
    yield delay(2000);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
      data: result,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_ERROR,
      error: error.response.data,
    });
  }
}

// function logoutAPI(data) {
//   // const result = axios.get('/user', data);
//   const result = {
//     email: data.email,
//     nickname: 'suyeon cho',
//   };
//   return result;
// }

function* logout() {
  try {
    // const result = yield call(logoutAPI, action.data);
    // console.log('result', result);
    yield delay(2000);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: null,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_ERROR,
      error: error.response.data,
    });
  }
}

function signupAPI(data) {
  return axios.post('http://localhost:6015/user', data);
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

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchSignUp),
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
