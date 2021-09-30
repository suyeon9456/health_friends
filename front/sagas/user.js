import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import { LOG_IN_ERROR,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_REQUEST } from '../reducers/user';

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

function logoutAPI(data) {
  // const result = axios.get('/user', data);
  const result = {
    email: data.email,
    nickname: 'suyeon cho',
  };
  return result;
}

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

function* signup() {
  console.log('request_saga');
  yield delay(2000);
  try {
    console.log('?');
  } catch (error) {
    yield put({
      type: LOG_OUT_ERROR,
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
