import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  ADD_LIKE_ERROR,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  LOAD_LIKE_ERROR,
  LOAD_LIKE_REQUEST,
  LOAD_LIKE_SUCCESS,
  LOAD_MY_INFO_ERROR,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
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
} from '../@types/utils';
import { User, Me, Profile, Friends, RankedFriends, RealtimeMatching, SignupData, SignupFriendsInfo, SignupGymInfo, SignupMoreInfo } from '../@types/user';
import { ActionType } from '../@types/action';

function loadMyInfoAPI(): Promise<AxiosResponse<Me>> {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result: AxiosResponse<Me> = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_MY_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function loginAPI(data?: { email: string; password: string }): Promise<AxiosResponse<Me>> {
  return axios.post('/user/login', data);
}

function* login(action: ActionType<typeof LOG_IN_REQUEST, { email: string; password: string } >) {
  try {
    const result: AxiosResponse<Me> = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOG_IN_ERROR,
      error: error.response.data,
    });
  }
}

function logoutAPI(): Promise<AxiosResponse<string>> {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: null,
    });
  } catch (error: any) {
    yield put({
      type: LOG_OUT_ERROR,
      error: error.response.data,
    });
  }
}

function signupAPI(data?: SignupData): Promise<AxiosResponse<string>> {
  return axios.post('/user', data);
}

function* signup(action: ActionType<typeof SIGN_UP_REQUEST, SignupData>) {
  try {
    yield call(signupAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (error: any) {
    yield put({
      type: SIGN_UP_ERROR,
      error: error.response.data,
    });
  }
}

function loadRecommendFriendsAPI(data?: { si: string; gu: string; dong: string; mainAddressNo: string; })
  : Promise<AxiosResponse<{ recommendFriends: Array<Friends>; additionalFriends: Array<Friends>  }>> {
    return axios.get(`/users/recommendFriends?si=${data?.si}&gu=${data?.gu}&dong=${data?.dong}&mainAddressNo=${data?.mainAddressNo}`);
  }

function* loadRecommendFriends(action: ActionType<typeof LOAD_RECOMMEND_FRIENDS_REQUEST, { si: string; gu: string; dong: string; mainAddressNo: string; }>) {
  try {
    const result: AxiosResponse<{ recommendFriends: Array<Friends>; additionalFriends: Array<Friends>  }> = yield call(loadRecommendFriendsAPI, action.data);
    yield put({
      type: LOAD_RECOMMEND_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_RECOMMEND_FRIENDS_ERROR,
      error: error.response.data,
    });
  }
}

function loadRankedFriendsAPI(): Promise<AxiosResponse<{ rematching: Array<RankedFriends>; matching: Array<RankedFriends> }>> {
  return axios.get('/users/rankedFriends');
}

function* loadRankedFriends() {
  try {
    const result: AxiosResponse<{ rematching: Array<RankedFriends>; matching: Array<RankedFriends> }> = yield call(loadRankedFriendsAPI);
    yield put({
      type: LOAD_RANKED_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_RANKED_FRIENDS_ERROR,
      error: error.response.data,
    });
  }
}

function loadRealtimeMathcingAPI(): Promise<AxiosResponse<Array<RealtimeMatching>>> {
  return axios.get('/users/realtimeMathcing');
}

function* loadRealtimeMathcing() {
  try {
    const result: AxiosResponse<Array<RealtimeMatching>> = yield call(loadRealtimeMathcingAPI);
    yield put({
      type: LOAD_REALTIME_MATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_REALTIME_MATCHING_ERROR,
      error: error.response.data,
    });
  }
}

function addLikeAPI(data?: number): Promise<AxiosResponse<User>> {
  return axios.patch(`/user/${data}/like`);
}

function* addLike(action: ActionType<typeof ADD_LIKE_REQUEST, number>) {
  try {
    const result: AxiosResponse<User> = yield call(addLikeAPI, action.data);
    yield put({
      type: ADD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: ADD_LIKE_ERROR,
      error: error.response.data,
    });
  }
}

function loadLikeAPI(): Promise<AxiosResponse<Array<User>>> {
  return axios.get('/user/like');
}

function* loadLike() {
  try {
    const result: AxiosResponse<Array<User>> = yield call(loadLikeAPI);
    yield put({
      type: LOAD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_LIKE_ERROR,
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

export default function* userSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchLoadMyInfo),
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchSignUp),
    yield fork(watchLoadRecommendFriends),
    yield fork(watchLoadRankedFriends),
    yield fork(watchLoadRealtimeMathcing),
    yield fork(watchAddLike),
    yield fork(watchLoadLike),
  ]);
}
