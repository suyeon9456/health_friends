import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_LIKE_ERROR, ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS, ADD_PROFILEIMAGE_ERROR, ADD_PROFILEIMAGE_REQUEST, ADD_PROFILEIMAGE_SUCCESS,
  LOAD_LIKE_ERROR,
  LOAD_LIKE_REQUEST,
  LOAD_LIKE_SUCCESS,
  LOAD_MY_INFO_ERROR,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_PROFILE_INFO_ERROR,
  LOAD_PROFILE_INFO_REQUEST,
  LOAD_PROFILE_INFO_SUCCESS,
  LOAD_PROFILE_MYINFO_ERROR,
  LOAD_PROFILE_MYINFO_REQUEST,
  LOAD_PROFILE_MYINFO_SUCCESS,
  LOAD_RANKED_FRIENDS_ERROR,
  LOAD_RANKED_FRIENDS_REQUEST,
  LOAD_RANKED_FRIENDS_SUCCESS,
  LOAD_REALTIME_MATCHING_ERROR,
  LOAD_REALTIME_MATCHING_REQUEST,
  LOAD_REALTIME_MATCHING_SUCCESS,
  LOAD_RECOMMEND_FRIENDS_ERROR,
  LOAD_RECOMMEND_FRIENDS_REQUEST,
  LOAD_RECOMMEND_FRIENDS_SUCCESS,
  LOG_IN_ERROR,
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
  UPLOAD_PROFILEIMAGE_ERROR,
  UPLOAD_PROFILEIMAGE_REQUEST,
  UPLOAD_PROFILEIMAGE_SUCCESS,
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
    console.log(error);
    yield put({
      type: LOAD_MY_INFO_ERROR,
      error: error.response || null,
    });
  }
}

function loadProfileInfoAPI(data) {
  return axios.get(`/user/profile/${data}`);
}

function* loadProfileInfo(action) {
  try {
    const result = yield call(loadProfileInfoAPI, action.data);
    yield put({
      type: LOAD_PROFILE_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_PROFILE_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function loadProfileMyinfoAPI() {
  return axios.get('/user/profile/myinfo');
}

function* loadProfileMyinfo() {
  try {
    const result = yield call(loadProfileMyinfoAPI);
    yield put({
      type: LOAD_PROFILE_MYINFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_PROFILE_MYINFO_ERROR,
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

function uploadProfileImageAPI(data) {
  return axios.post('/user/image', data);
}

function* uploadProfileImage(action) {
  try {
    const result = yield call(uploadProfileImageAPI, action.data);
    yield put({
      type: UPLOAD_PROFILEIMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UPLOAD_PROFILEIMAGE_ERROR,
      error: error.response.data,
    });
  }
}

function addProfileImageAPI(data) {
  return axios.post('/user/profileimage', data);
}

function* addProfileImage(action) {
  try {
    const result = yield call(addProfileImageAPI, action.data);
    yield put({
      type: ADD_PROFILEIMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_PROFILEIMAGE_ERROR,
      error: error.response.data,
    });
  }
}

function loadRecommendFriendsAPI(data) {
  return axios.get(`/users/recommendFriends?si=${data.si}&gu=${data.gu}&dong=${data.dong}&mainAddressNo=${data.mainAddressNo}`);
}

function* loadRecommendFriends(action) {
  try {
    const result = yield call(loadRecommendFriendsAPI, action.data);
    yield put({
      type: LOAD_RECOMMEND_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_RECOMMEND_FRIENDS_ERROR,
      error: error.response.data,
    });
  }
}

function loadRankedFriendsAPI() {
  return axios.get('/users/rankedFriends');
}

function* loadRankedFriends() {
  try {
    const result = yield call(loadRankedFriendsAPI);
    yield put({
      type: LOAD_RANKED_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_RANKED_FRIENDS_ERROR,
      error: error.response.data,
    });
  }
}

function loadRealtimeMathcingAPI() {
  return axios.get('/users/realtimeMathcing');
}

function* loadRealtimeMathcing() {
  try {
    const result = yield call(loadRealtimeMathcingAPI);
    yield put({
      type: LOAD_REALTIME_MATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_REALTIME_MATCHING_ERROR,
      error: error.response.data,
    });
  }
}

function addLikeAPI(data) {
  return axios.patch(`/user/${data}/like`);
}

function* addLike(action) {
  try {
    const result = yield call(addLikeAPI, action.data);
    yield put({
      type: ADD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_LIKE_ERROR,
      error: error.response.data,
    });
  }
}

function loadLikeAPI() {
  return axios.get('/user/like');
}

function* loadLike() {
  try {
    const result = yield call(loadLikeAPI);
    yield put({
      type: LOAD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_LIKE_ERROR,
      error: error.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadProfileInfo() {
  yield takeLatest(LOAD_PROFILE_INFO_REQUEST, loadProfileInfo);
}

function* watchLoadProfileMyinfo() {
  yield takeLatest(LOAD_PROFILE_MYINFO_REQUEST, loadProfileMyinfo);
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

function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILEIMAGE_REQUEST, uploadProfileImage);
}

function* watchAddProfileImage() {
  yield takeLatest(ADD_PROFILEIMAGE_REQUEST, addProfileImage);
}

function* watchLoadRecommendFriends() {
  yield takeLatest(LOAD_RECOMMEND_FRIENDS_REQUEST, loadRecommendFriends);
}

function* watchLoadRankedFriends() {
  yield takeLatest(LOAD_RANKED_FRIENDS_REQUEST, loadRankedFriends);
}

function* watchLoadRealtimeMathcing() {
  yield takeLatest(LOAD_REALTIME_MATCHING_REQUEST, loadRealtimeMathcing);
}

function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

function* watchLoadLike() {
  yield takeLatest(LOAD_LIKE_REQUEST, loadLike);
}

export default function* userSaga() {
  yield all([
    yield fork(watchLoadMyInfo),
    yield fork(watchLoadProfileInfo),
    yield fork(watchLoadProfileMyinfo),
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchSignUp),
    yield fork(watchUpdateMyInfo),
    yield fork(watchUpdateMyFriendsInfo),
    yield fork(watchUpdateMyNickname),
    yield fork(watchUpdateMyDescription),
    yield fork(watchUploadProfileImage),
    yield fork(watchAddProfileImage),
    yield fork(watchLoadRecommendFriends),
    yield fork(watchLoadRankedFriends),
    yield fork(watchLoadRealtimeMathcing),
    yield fork(watchAddLike),
    yield fork(watchLoadLike),
  ]);
}
