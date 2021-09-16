import { all } from 'redux-saga/effects';

export default function* userSaga() {
  yield all([
    // yield fork(watchLoadMyInfo),
    // yield fork(watchLoadUser),
    // yield fork(watchLogin),
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
