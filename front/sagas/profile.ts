import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { Profile, SignupFriendsInfo, SignupGymInfo, SignupMoreInfo } from '../@types/user';
import { loadProfileInfoRequest,
  loadProfileInfoSuccess,
  loadProfileInfoError,
  loadProfileMyinfoRequest,
  loadProfileMyinfoSuccess,
  loadProfileMyinfoError,
  updateMyinfoRequest,
  updateMyinfoSuccess,
  updateMyinfoError,
  updateMyFriendsInfoRequest,
  updateMyFriendsInfoSuccess,
  updateMyFriendsInfoError,
  updateMyNicknameRequest,
  updateMyNicknameSuccess,
  updateMyNicknameError,
  updateMyDescriptionRequest,
  updateMyDescriptionSuccess,
  updateMyDescriptionError,
  uploadProfileImageRequest,
  uploadProfileImageSuccess,
  uploadProfileImageError,
  addProfileImageRequest,
  addProfileImageSuccess,
  addProfileImageError } from '../reducers/profile';
import { PayloadAction } from '@reduxjs/toolkit';
import { changeNickname } from '../reducers/user';

function loadProfileInfoAPI(data?: number): Promise<AxiosResponse<Profile>> {
  return axios.get(`/user/profile/${data}`);
}

function* loadProfileInfo(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse<Profile> = yield call(loadProfileInfoAPI, action.payload);
    yield put(loadProfileInfoSuccess(result.data));
  } catch (error: any) {
    yield put(loadProfileInfoError(error.response.data));
  }
}

function loadProfileMyinfoAPI(): Promise<AxiosResponse<Profile>> {
  return axios.get('/user/profile/myinfo');
}

function* loadProfileMyinfo() {
  try {
    const result: AxiosResponse<Profile> = yield call(loadProfileMyinfoAPI);
    yield put(loadProfileMyinfoSuccess(result.data));
  } catch (error: any) {
    yield put(loadProfileMyinfoError(error.response.data));
  }
}

function updateMyInfoAPI(data?: SignupMoreInfo & SignupGymInfo): Promise<AxiosResponse<Profile>> {
  return axios.put('/user', data);
}

function* updateMyInfo(action: PayloadAction<SignupMoreInfo & SignupGymInfo>) {
    try {
      const result: AxiosResponse<Profile> = yield call(updateMyInfoAPI, action.payload);
      yield put(updateMyinfoSuccess(result.data));
    } catch (error: any) {
      yield put(updateMyinfoError(error.response.data));
    }
  }

function updateMyFriendsInfoAPI(data?: SignupFriendsInfo): Promise<AxiosResponse<Profile>> {
  return axios.put('/user/detail', data);
}

function* updateMyFriendsInfo(action: PayloadAction<SignupFriendsInfo>) {
  try {
    const result: AxiosResponse<Profile> = yield call(updateMyFriendsInfoAPI, action.payload);
    yield put(updateMyFriendsInfoSuccess(result.data));
  } catch (error: any) {
    yield put(updateMyFriendsInfoError(error.response.data));
  }
}

function updateMyNicknameAPI(data: { nickname: string }): Promise<AxiosResponse<{ nickname: string }>> {
  return axios.patch('/user/nickname', data);
}

function* updateMyNickname(action: PayloadAction<{ nickname: string }>) {
  try {
    const result: AxiosResponse<{ nickname: string }> = yield call(updateMyNicknameAPI, action.payload);
    yield put(updateMyNicknameSuccess(result.data.nickname));
    yield put(changeNickname(result.data.nickname));
  } catch (error: any) {
    yield put(updateMyNicknameError(error.response.data));
  }
}

function updateMyDescriptionAPI(data?: { description: string }): Promise<AxiosResponse<{ description: string }>> {
  return axios.patch('/user/description', data);
}

function* updateMyDescription(action: PayloadAction<{ description: string }>) {
  try {
    const result: AxiosResponse<{ description: string }> = yield call(updateMyDescriptionAPI, action.payload);
    yield put(updateMyDescriptionSuccess(result.data.description));
  } catch (error: any) {
    yield put(updateMyDescriptionError(error.response.data));
  }
}

function uploadProfileImageAPI(data?: FormData): Promise<AxiosResponse<string>> {
  return axios.post('/user/image', data);
}

function* uploadProfileImage(action: PayloadAction<FormData>) {
  try {
    const result: AxiosResponse<string> = yield call(uploadProfileImageAPI, action.payload);
    yield put(uploadProfileImageSuccess(result.data));
  } catch (error: any) {
    yield put(uploadProfileImageError(error.response.data));
  }
}

function addProfileImageAPI(data?: { image: string }): Promise<AxiosResponse<Profile>> {
  return axios.post('/user/profileimage', data);
}

function* addProfileImage(action: PayloadAction<{ image: string }>) {
  try {
    const result: AxiosResponse<Profile> = yield call(addProfileImageAPI, action.payload);
    yield put(addProfileImageSuccess(result.data));
  } catch (error: any) {
    yield put(addProfileImageError(error.response.data));
  }
}

function* watchLoadProfileInfo() {
  yield takeLatest(loadProfileInfoRequest, loadProfileInfo);
}

function* watchLoadProfileMyinfo() {
  yield takeLatest(loadProfileMyinfoRequest, loadProfileMyinfo);
}

function* watchUpdateMyInfo() {
  yield takeLatest(updateMyinfoRequest, updateMyInfo);
}

function* watchUpdateMyFriendsInfo() {
  yield takeLatest(updateMyFriendsInfoRequest, updateMyFriendsInfo);
}

function* watchUpdateMyNickname() {
  yield takeLatest(updateMyNicknameRequest, updateMyNickname);
}

function* watchUpdateMyDescription() {
  yield takeLatest(updateMyDescriptionRequest, updateMyDescription);
}

function* watchUploadProfileImage() {
  yield takeLatest(uploadProfileImageRequest, uploadProfileImage);
}

function* watchAddProfileImage() {
  yield takeLatest(addProfileImageRequest, addProfileImage);
}

export default function* profileSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchLoadProfileInfo),
    yield fork(watchLoadProfileMyinfo),
    yield fork(watchUpdateMyInfo),
    yield fork(watchUpdateMyFriendsInfo),
    yield fork(watchUpdateMyNickname),
    yield fork(watchUpdateMyDescription),
    yield fork(watchUploadProfileImage),
    yield fork(watchAddProfileImage),
  ]);
}


