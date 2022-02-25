import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  ADD_GYM_ERROR,
  ADD_GYM_REQUEST,
  ADD_GYM_SUCCESS,
  LOAD_FRIENDS_ERROR,
  LOAD_FRIENDS_REQUEST,
  LOAD_FRIENDS_SUCCESS,
  LOAD_GYM_ERROR,
  LOAD_GYM_REQUEST,
  LOAD_GYM_SUCCESS,
  SELECT_GYM,
} from '../@types/utils';
import { Address, Gym, Gyms } from '../@types/gym';
import { ActionType, CustomActionType, LoadGymProps } from '../@types/action';

function addGymAPI(data?: Address): Promise<AxiosResponse<Gym>> {
  return axios.post('/gym', data);
}

function* addGym(action: ActionType<typeof ADD_GYM_REQUEST, Address>) {
  try {
    const result: AxiosResponse<Gym> = yield call(addGymAPI, action.data);
    yield put({
      type: ADD_GYM_SUCCESS,
      data: result.data,
    });
    yield put({
      type: SELECT_GYM,
      data: { id: result.data.id, name: result.data.name },
    });
  } catch (error: any) {
    yield put({
      type: ADD_GYM_ERROR,
      error: error.response.data,
    });
  }
}

function loadGymsAPI(lastId: number, data?: LoadGymProps): Promise<AxiosResponse<Gyms>> {
  return axios.get(`/gyms?lastId=${lastId || 0}&searchWord=${data?.searchWord || ''}&swLon=${data?.swLon}&swLat=${data?.swLat}&neLon=${data?.neLon}&neLat=${data?.neLat}`);
}

function* loadGyms(action: CustomActionType<typeof LOAD_GYM_REQUEST, LoadGymProps, number>) {
  try {
    const result: AxiosResponse<Gyms> = yield call(loadGymsAPI, action.lastId, action.data);
    yield put({
      type: LOAD_GYM_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    yield put({
      type: LOAD_GYM_ERROR,
      error: error.response.data,
    });
  }
}

function loadFriendsAPI(lastId: number, data?: { gymId: number }): Promise<AxiosResponse<Gym>> {
  return axios.get(`/gym/${data?.gymId || 0}?lastId=${lastId || 0}`);
}

function* loadFriends(action: CustomActionType<typeof LOAD_FRIENDS_REQUEST, { gymId: number }, number>) {
  try {
    const result: AxiosResponse<Gym> = yield call(loadFriendsAPI, action.lastId, action.data);
    yield put({
      type: LOAD_FRIENDS_SUCCESS,
      data: result.data,
    });
  } catch (error: any) {
    console.error(error);
    yield put({
      type: LOAD_FRIENDS_ERROR,
      error: error.response.data,
    });
  }
}

function* watchAddGym() {
  yield takeLatest(ADD_GYM_REQUEST, addGym);
}

function* watchLoadGyms() {
  yield takeLatest(LOAD_GYM_REQUEST, loadGyms);
}

function* watchLoadFriends() {
  yield takeLatest(LOAD_FRIENDS_REQUEST, loadFriends);
}

export default function* userSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchAddGym),
    yield fork(watchLoadGyms),
    yield fork(watchLoadFriends)
  ]);
}
