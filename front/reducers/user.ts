import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { UserInitialState } from '../@types/reducer/state';
import { RootState } from '../store/configureStore';

const initialState: UserInitialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  signupSteps: [
    { id: 1, type: 'process', step: 1, title: 'STEP1', description: '회원 정보' },
    { id: 2, type: 'wait', step: 2, title: 'STEP2', description: '추가 정보' },
    { id: 3, type: 'wait', step: 3, title: 'STEP3', description: '추가 정보' },
    { id: 4, type: 'wait', step: 4, title: 'STEP4', description: '매칭되고 싶은 친구 정보' },
  ],
  ageOptions: [
    { value: 1, text: '10대' },
    { value: 2, text: '20대' },
    { value: 3, text: '30대' },
    { value: 4, text: '40대' },
    { value: 5, text: '50대' },
    { value: 6, text: '60대' },
    { value: 7, text: '70대' },
    { value: 8, text: '80대' },
    { value: 9, text: '90대' },
    { value: 10, text: '90대 이상' },
  ],
  careerOptions: [
    { value: 1, text: '1년 미만' },
    { value: 2, text: '1년 이상 ~ 3년 미만' },
    { value: 3, text: '3년 이상 ~ 5년 미만' },
    { value: 4, text: '5년 이상 ~ 10년 미만' },
    { value: 5, text: '10년 이상' },
  ],
  roleOptions: [
    { value: 1, text: '도움을 주고 싶어요!' },
    { value: 2, text: '도움을 받고 싶어요!' },
    { value: 3, text: '함께 운동하고 싶어요!' },
  ],
  genderOptions: [
    { value: 'male', text: '남성' },
    { value: 'female', text: '여성' },
  ],
  searchGymTabs: [{ value: 'search', text: '헬스장 찾기' }, { value: 'add', text: '헬스장 등록' }],
  signupProcess: 1,
  signupStepInfo: null,
  signupStepMoreInfo: null,
  signupStepGymInfo: null,
  signupStepFriendsInfo: null,
  selectedGym: null,
  me: null,
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    loadMyInfoRequest(state) {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    },
    loadMyInfoSuccess(state, action) {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = true;
      state.loadMyInfoError = null;
      state.me = action.payload;
    },
    loadMyInfoError(state, action) {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = action.payload;
    },
    loginRequest(state, action) {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    },
    loginSuccess(state, action) {
      state.loginLoading = false;
      state.loginDone = true;
      state.loginError = null;
      state.me = action.payload;
    },
    loginError(state, action) {
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = action.payload;
    },
    logoutRequest(state) {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },
    logoutSuccess(state) {
      state.logoutLoading = false;
      state.logoutDone = true;
      state.logoutError = null;
      state.me = null;
    },
    logoutError(state, action) {
      state.logoutLoading = false;
      state.logoutDone = false;
      state.logoutError = action.payload;
    },
    signupStepNext(state) {
      state.signupProcess += 1;
    },
    signupStepPrev(state) {
      state.signupProcess -= 1;
    },
    signupStepInfoSave(state, action) {
      state.signupStepInfo = action.payload;
    },
    signupStepMoreInfoSave(state, action) {
      state.signupStepMoreInfo = action.payload;
    },
    signupStepGymInfoSave(state, action) {
      state.signupStepGymInfo = action.payload;
    },
    signupStepFriendsInfoSave(state, action) {
      state.signupStepFriendsInfo = action.payload;
    },
    selectGym(state, action) {
      state.selectedGym = action.payload;
    },
    signupRequest(state, action) {
      state.signupLoading = true;
      state.signupDone = false;
      state.signupError = null;
    },
    signupSuccess(state) {
      state.signupLoading = false;
      state.signupDone = true;
      state.signupError = null;
      state.signupStepInfo = null;
      state.signupStepMoreInfo = null;
      state.signupStepGymInfo = null;
      state.signupStepFriendsInfo = null;
      state.selectedGym = null;
    },
    signupError(state, action) {
      state.signupLoading = false;
      state.signupDone = false;
      state.signupError = action.payload;
    },
    addLikeRequest(state, action) {
      state.addLikeLoading = true;
      state.addLikeDone = false;
      state.addLikeError = null;
    },
    addLikeSuccess(state, action) {
      state.addLikeLoading = false;
      state.addLikeDone = true;
      state.addLikeError = null;
    },
    addLikeError(state, action) {
      state.addLikeLoading = false;
      state.addLikeDone = false;
      state.addLikeError = action.payload;
    },
    changeNickname(state, action) {
      state.me!.nickname = action.payload;
    },
  }
});

export const loginSelector = createDraftSafeSelector(
  (state: RootState) => state.user.loginError,
  (loginError) => ({ loginError }),
)

export const userSelector = createDraftSafeSelector(
  (state: RootState) => state.user.me,
  (me) => ({ me }),
);

export const optionsSelector = createDraftSafeSelector(
  (state: RootState) => state.user.careerOptions,
  (state: RootState) => state.user.roleOptions,
  (state: RootState) => state.user.genderOptions,
  (state: RootState) => state.user.ageOptions,
  (state: RootState) => state.user.searchGymTabs,
  (
    careerOptions,
    roleOptions,
    genderOptions,
    ageOptions,
    searchGymTabs,
  ) => ({
    careerOptions,
    roleOptions,
    genderOptions,
    ageOptions,
    searchGymTabs,
  }),
)

export const signupSelector = createDraftSafeSelector(
  (state: RootState) => state.user.signupStepMoreInfo,
  (state: RootState) => state.user.signupSteps,
  (state: RootState) => state.user.signupProcess,
  (state: RootState) => state.user.signupStepInfo,
  (state: RootState) => state.user.signupStepMoreInfo,
  (state: RootState) => state.user.signupStepGymInfo,
  (state: RootState) => state.user.signupStepFriendsInfo,
  (state: RootState) => state.user.selectedGym,
  (state: RootState) => state.user.signupDone,
  (
    signupSteps,
    signupProcess,
    signupStepInfo,
    signupStepMoreInfo,
    signupStepGymInfo,
    signupStepFriendsInfo,
    selectedGym,
    signupDone,
  ) => ({
    signupSteps,
    signupProcess,
    signupStepInfo,
    signupStepMoreInfo,
    signupStepGymInfo,
    signupStepFriendsInfo,
    selectedGym,
    signupDone,
  }),
);

export const {
  loadMyInfoRequest,
  loadMyInfoSuccess,
  loadMyInfoError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  signupStepNext,
  signupStepPrev,
  signupStepInfoSave,
  signupStepMoreInfoSave,
  signupStepGymInfoSave,
  signupStepFriendsInfoSave,
  selectGym,
  signupRequest,
  signupSuccess,
  signupError,
  addLikeRequest,
  addLikeSuccess,
  addLikeError,
  changeNickname,
} = userSlice.actions
export default userSlice.reducer;
