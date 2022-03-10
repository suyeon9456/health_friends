import { all, fork, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { Address, Gym, Gyms } from '../@types/gym';
import { LoadGymProps } from '../@types/action';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  addGymRequeset,
  addGymSuccess,
  addGymError,
  loadGymRequest,
  loadGymSuccess,
  loadGymError,
  loadFriendsRequest,
  loadFriendsSuccess,
  loadFriendsError,
} from '../reducers/gym';
import { selectGym } from '../reducers/user';

function addGymAPI(data?: Address): Promise<AxiosResponse<Gym>> {
  return axios.post('/gym', data);
}

function* addGym(action: PayloadAction<Address>) {
  try {
    const result: AxiosResponse<Gym> = yield call(addGymAPI, action.payload);
    yield put(addGymSuccess());
    yield put(selectGym({ id: result.data.id, name: result.data.name }));
  } catch (error: any) {
    yield put(addGymError(error.response.data));
  }
}

function loadGymsAPI(data: LoadGymProps): Promise<AxiosResponse<Gyms>> {
  return axios.get(`/gyms?lastId=${data?.lastId || 0}&searchWord=${data?.searchWord || ''}&swLon=${data?.swLon}&swLat=${data?.swLat}&neLon=${data?.neLon}&neLat=${data?.neLat}`);
}

function* loadGyms(action: PayloadAction<LoadGymProps>) {
  try {
    console.log('test', action.payload);
    const result: AxiosResponse<Gyms> = yield call(loadGymsAPI, action.payload);
    yield put(loadGymSuccess(result.data));
  } catch (error: any) {
    yield put(loadGymError(error.response.data));
  }
}

function loadFriendsAPI({ gymId, lastId }: { gymId: number, lastId: number }): Promise<AxiosResponse<Gym>> {
  return axios.get(`/gym/${gymId || 0}?lastId=${lastId || 0}`);
}

function* loadFriends(action: PayloadAction<{ gymId: number, lastId: number }>) {
  try {
    const result: AxiosResponse<Gym> = yield call(loadFriendsAPI, action.payload);
    yield put(loadFriendsSuccess(result.data));
  } catch (error: any) {
    console.error(error);
    yield put(loadFriendsError(error.response.data));
  }
}

function* watchAddGym() {
  yield takeLatest(addGymRequeset, addGym);
}

function* watchLoadGyms() {
  yield takeLatest(loadGymRequest, loadGyms);
}

function* watchLoadFriends() {
  yield takeLatest(loadFriendsRequest, loadFriends);
}

export default function* userSaga(): Generator<ForkEffect<void> | AllEffect<any>, void, any> {
  yield all([
    yield fork(watchAddGym),
    yield fork(watchLoadGyms),
    yield fork(watchLoadFriends)
  ]);
}
