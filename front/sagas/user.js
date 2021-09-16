import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import { LOG_IN_ERROR,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS } from '../reducers/user';

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
  } catch (e) {
    yield put({
      type: LOG_IN_ERROR,
      error: e.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([
    yield fork(watchLogin),
    // yield fork(watchLoadMyInfo),
    // yield fork(watchLoadUser),
    // yield fork(watchLogout),
    // yield fork(watchSignUp),
    // yield fork(watchLoadFollowings),
    // yield fork(watchLoadFollowers),
    // yield fork(watchFollow),
    // yield fork(watchUnFollow),
    // yield fork(watchRemoveFollower),
    // yield fork(watchChangeNickname),
  ]);
}
