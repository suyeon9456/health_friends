import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import gymSaga from './gym';

axios.defaults.baseURL = 'http://localhost:6015';
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(gymSaga),
  ]);
}
