import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { User, Me, Friends, RankedFriends, RealtimeMatching, SignupData } from '../@types/user';
import { PayloadAction } from '@reduxjs/toolkit';
import { loadMyInfoRequest,
  loadMyInfoSuccess,
  loadMyInfoError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  signupRequest,
  signupSuccess,
  signupError,
  loadRecommendFriendsRequest,
  loadRecommendFriendsSuccess,
  loadRecommendFriendsError,
  loadRankedFriendsRequest,
  loadRankedFriendsSuccess,
  loadRankedFriendsError,
  loadRealtimeMatchingRequest,
  loadRealtimeMatchingSuccess,
  loadRealtimeMatchingError,
  addLikeRequest,
  addLikeSuccess,
  addLikeError,
  loadLikeRequest,
  loadLikeSuccess,
  loadLikeError } from '../reducers/user';

function loadMyInfoAPI(): Promise<AxiosResponse<Me>> {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result: AxiosResponse<Me> = yield call(loadMyInfoAPI);
    yield put(loadMyInfoSuccess(result.data));
  } catch (error: any) {
    yield put(loadMyInfoError(error.response.data));
  }
}

function loginAPI(data?: { email: string; password: string }): Promise<AxiosResponse<Me>> {
  return axios.post('/user/login', data);
}

function* login(action: PayloadAction<{ email: string; password: string } >) {
  try {
    const result: AxiosResponse<Me> = yield call(loginAPI, action.payload);
    yield put(loginSuccess(result.data));
  } catch (error: any) {
    yield put(loginError(error.response.data));
  }
}

function logoutAPI(): Promise<AxiosResponse<string>> {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutError(error.response.data));
  }
}

function signupAPI(data?: SignupData): Promise<AxiosResponse<string>> {
  return axios.post('/user', data);
}

function* signup(action: PayloadAction<SignupData>) {
  try {
    yield call(signupAPI, action.payload);
    yield put(signupSuccess());
  } catch (error: any) {
    yield put(signupError(error.response.data));
  }
}

function loadRecommendFriendsAPI(data?: { si: string; gu: string; dong: string; mainAddressNo: string; })
  : Promise<AxiosResponse<{ recommendFriends: Array<Friends>; additionalFriends: Array<Friends>  }>> {
    return axios.get(`/users/recommendFriends?si=${data?.si}&gu=${data?.gu}&dong=${data?.dong}&mainAddressNo=${data?.mainAddressNo}`);
  }

function* loadRecommendFriends(action: PayloadAction<{ si: string; gu: string; dong: string; mainAddressNo: string; }>) {
  try {
    const result: AxiosResponse<{ recommendFriends: Array<Friends>; additionalFriends: Array<Friends>  }> = yield call(loadRecommendFriendsAPI, action.payload);
    yield put(loadRecommendFriendsSuccess(result.data));
  } catch (error: any) {
    yield put(loadRecommendFriendsError(error.response.data));
  }
}

function loadRankedFriendsAPI(): Promise<AxiosResponse<{ rematching: Array<RankedFriends>; matching: Array<RankedFriends> }>> {
  return axios.get('/users/rankedFriends');
}

function* loadRankedFriends() {
  try {
    const result: AxiosResponse<{ rematching: Array<RankedFriends>; matching: Array<RankedFriends> }> = yield call(loadRankedFriendsAPI);
    yield put(loadRankedFriendsSuccess(result.data));
  } catch (error: any) {
    yield put(loadRankedFriendsError(error.response.data));
  }
}

function loadRealtimeMathcingAPI(): Promise<AxiosResponse<Array<RealtimeMatching>>> {
  return axios.get('/users/realtimeMathcing');
}

function* loadRealtimeMathcing() {
  try {
    const result: AxiosResponse<Array<RealtimeMatching>> = yield call(loadRealtimeMathcingAPI);
    yield put(loadRealtimeMatchingSuccess(result.data));
  } catch (error: any) {
    yield put(loadRealtimeMatchingError(error.response.data));
  }
}

function addLikeAPI(data?: number): Promise<AxiosResponse<User>> {
  return axios.patch(`/user/${data}/like`);
}

function* addLike(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse<User> = yield call(addLikeAPI, action.payload);
    yield put(addLikeSuccess(result.data));
  } catch (error: any) {
    yield put(addLikeError(error.response.data));
  }
}

function loadLikeAPI(): Promise<AxiosResponse<Array<User>>> {
  return axios.get('/user/like');
}

function* loadLike() {
  try {
    const result: AxiosResponse<Array<User>> = yield call(loadLikeAPI);
    yield put(loadLikeSuccess(result.data));
  } catch (error: any) {
    yield put(loadLikeError(error.response.data));
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(loadMyInfoRequest, loadMyInfo);
}

function* watchLogin() {
  yield takeLatest(loginRequest, login);
}

function* watchLogout() {
  yield takeLatest(logoutRequest, logout);
}

function* watchSignUp() {
  yield takeLatest(signupRequest, signup);
}

function* watchLoadRecommendFriends() {
  yield takeLatest(loadRecommendFriendsRequest, loadRecommendFriends);
}

function* watchLoadRankedFriends() {
  yield takeLatest(loadRankedFriendsRequest, loadRankedFriends);
}

function* watchLoadRealtimeMathcing() {
  yield takeLatest(loadRealtimeMatchingRequest, loadRealtimeMathcing);
}

function* watchAddLike() {
  yield takeLatest(addLikeRequest, addLike);
}

function* watchLoadLike() {
  yield takeLatest(loadLikeRequest, loadLike);
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
