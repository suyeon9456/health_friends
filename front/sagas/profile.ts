import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  ADD_PROFILEIMAGE_ERROR,
  ADD_PROFILEIMAGE_REQUEST,
  ADD_PROFILEIMAGE_SUCCESS,
  LOAD_PROFILE_INFO_ERROR,
  LOAD_PROFILE_INFO_REQUEST,
  LOAD_PROFILE_INFO_SUCCESS,
  LOAD_PROFILE_MYINFO_ERROR,
  LOAD_PROFILE_MYINFO_REQUEST,
  LOAD_PROFILE_MYINFO_SUCCESS,
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
} from '../@types/utils';
import { Profile, SignupFriendsInfo, SignupGymInfo, SignupMoreInfo } from '../@types/user';
import { ActionType } from '../@types/action';

function loadProfileInfoAPI(data?: number): Promise<AxiosResponse<Profile>> {
  return axios.get(`/user/profile/${data}`);
}

function* loadProfileInfo(action: ActionType<typeof LOAD_PROFILE_INFO_REQUEST, number>) {
  try {
    const result: AxiosResponse<Profile> = yield call(loadProfileInfoAPI, action.data);
    yield put({
      type: LOAD_PROFILE_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_PROFILE_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function loadProfileMyinfoAPI(): Promise<AxiosResponse<Profile>> {
  return axios.get('/user/profile/myinfo');
}

function* loadProfileMyinfo() {
  try {
    const result: AxiosResponse<Profile> = yield call(loadProfileMyinfoAPI);
    yield put({
      type: LOAD_PROFILE_MYINFO_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_PROFILE_MYINFO_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyInfoAPI(data?: SignupMoreInfo & SignupGymInfo): Promise<AxiosResponse<Profile>> {
  return axios.put('/user', data);
}

function* updateMyInfo(action: ActionType<typeof UPDATE_MY_INFO_REQUEST, SignupMoreInfo & SignupGymInfo>) {
    try {
      const result: AxiosResponse<Profile> = yield call(updateMyInfoAPI, action.data);
      yield put({
        type: UPDATE_MY_INFO_SUCCESS,
        data: result.data,
      });
    } catch (error: any) {
      yield put({
        type: UPDATE_MY_INFO_ERROR,
        error: error.response.data,
      });
    }
  }

function updateMyFriendsInfoAPI(data?: SignupFriendsInfo): Promise<AxiosResponse<Profile>> {
  return axios.put('/user/detail', data);
}

function* updateMyFriendsInfo(action: ActionType<typeof UPDATE_MY_FRIENDS_INFO_REQUEST, SignupFriendsInfo>) {
  try {
    const result: AxiosResponse<Profile> = yield call(updateMyFriendsInfoAPI, action.data);
    yield put({
      type: UPDATE_MY_FRIENDS_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_MY_FRIENDS_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyNicknameAPI(data?: { nickname: string }): Promise<AxiosResponse<{ nickname: string }>> {
  return axios.patch('/user/nickname', data);
}

function* updateMyNickname(action: ActionType<typeof UPDATE_MY_NICKNAME_REQUEST, { nickname: string }>) {
  try {
    const result: AxiosResponse<{ nickname: string }> = yield call(updateMyNicknameAPI, action.data);
    yield put({
      type: UPDATE_MY_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_MY_NICKNAME_ERROR,
      error: error.response.data,
    });
  }
}

function updateMyDescriptionAPI(data?: { description: string }): Promise<AxiosResponse<{ description: string }>> {
  return axios.patch('/user/description', data);
}

function* updateMyDescription(action: ActionType<typeof UPDATE_MY_DESCRIPTION_REQUEST, { description: string }>) {
  try {
    const result: AxiosResponse<{ description: string }> = yield call(updateMyDescriptionAPI, action.data);
    yield put({
      type: UPDATE_MY_DESCRIPTION_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_MY_DESCRIPTION_ERROR,
      error: error.response.data,
    });
  }
}

function uploadProfileImageAPI(data?: FormData): Promise<AxiosResponse<string>> {
  return axios.post('/user/image', data);
}

function* uploadProfileImage(action: ActionType<typeof UPLOAD_PROFILEIMAGE_REQUEST, FormData>) {
  try {
    const result: AxiosResponse<string> = yield call(uploadProfileImageAPI, action.data);
    yield put({
      type: UPLOAD_PROFILEIMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: UPLOAD_PROFILEIMAGE_ERROR,
      error: error.response.data,
    });
  }
}

function addProfileImageAPI(data?: { image: string }): Promise<AxiosResponse<Profile>> {
  return axios.post('/user/profileimage', data);
}

function* addProfileImage(action: ActionType<typeof ADD_PROFILEIMAGE_REQUEST, { image: string }>) {
  try {
    const result: AxiosResponse<Profile> = yield call(addProfileImageAPI, action.data);
    yield put({
      type: ADD_PROFILEIMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: ADD_PROFILEIMAGE_ERROR,
      error: error.response.data,
    });
  }
}

function* watchLoadProfileInfo() {
  yield takeLatest(LOAD_PROFILE_INFO_REQUEST, loadProfileInfo);
}

function* watchLoadProfileMyinfo() {
  yield takeLatest(LOAD_PROFILE_MYINFO_REQUEST, loadProfileMyinfo);
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


