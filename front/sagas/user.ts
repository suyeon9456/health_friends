import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { User, Me } from '../@types/user';
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
  addLikeRequest,
  addLikeSuccess,
  addLikeError } from '../reducers/user';

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

function* watchLoadMyInfo() {
  yield takeLatest(loadMyInfoRequest, loadMyInfo);
}

function* watchLogin() {
  yield takeLatest(loginRequest, login);
}

function* watchLogout() {
  yield takeLatest(logoutRequest, logout);
}

function* watchAddLike() {
  yield takeLatest(addLikeRequest, addLike);
}

export default function* userSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchLoadMyInfo),
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchAddLike),
  ]);
}
