import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_GYM_ERROR, ADD_GYM_REQUEST, ADD_GYM_SUCCESS } from '../reducers/gym';
import { SELECT_GYM } from '../reducers/user';

function addGymAPI(data) {
  return axios.post('http://localhost:6015/gym', data);
}

function* addGym(action) {
  try {
    console.log(action.data);
    const result = yield call(addGymAPI, action.data);
    console.log('result', result);
    yield put({
      type: ADD_GYM_SUCCESS,
      // data: result.data,
      data: result,
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

function* watchAddGym() {
  yield takeLatest(ADD_GYM_REQUEST, addGym);
}

export default function* userSaga() {
  yield all([
    yield fork(watchAddGym),
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
