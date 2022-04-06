import {
  all,
  fork,
  call,
  put,
  takeLatest,
  ForkEffect,
  AllEffect,
} from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../@types/user';
import {
  uploadProfileImageRequest,
  uploadProfileImageSuccess,
  uploadProfileImageError,
  addProfileImageRequest,
  addProfileImageSuccess,
  addProfileImageError,
} from '../reducers/profile';

function uploadProfileImageAPI(
  data?: FormData
): Promise<AxiosResponse<string>> {
  return axios.post('/user/image', data);
}

function* uploadProfileImage(action: PayloadAction<FormData>) {
  try {
    const result: AxiosResponse<string> = yield call(
      uploadProfileImageAPI,
      action.payload
    );
    yield put(uploadProfileImageSuccess(result.data));
  } catch (error: any) {
    yield put(uploadProfileImageError(error.response.data));
  }
}

function addProfileImageAPI(data?: {
  image: string;
}): Promise<AxiosResponse<Profile>> {
  return axios.post('/user/profileimage', data);
}

function* addProfileImage(action: PayloadAction<{ image: string }>) {
  try {
    const result: AxiosResponse<Profile> = yield call(
      addProfileImageAPI,
      action.payload
    );
    yield put(addProfileImageSuccess(result.data));
  } catch (error: any) {
    yield put(addProfileImageError(error.response.data));
  }
}

function* watchUploadProfileImage() {
  yield takeLatest(uploadProfileImageRequest, uploadProfileImage);
}

function* watchAddProfileImage() {
  yield takeLatest(addProfileImageRequest, addProfileImage);
}

export default function* profileSaga(): Generator<
  ForkEffect<void> | AllEffect<any>,
  void,
  any
> {
  yield all([
    yield fork(watchUploadProfileImage),
    yield fork(watchAddProfileImage),
  ]);
}
