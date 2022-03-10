import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { UserInitialState } from '../@types/reducer/state';
import { SignupMenu } from '../@types/utils';
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
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  signupProcess: SignupMenu.INFO,
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
    signupStepNext(state, action) {
      state.signupProcess = action.payload;
    },
    signupStepPrev(state, action) {
      state.signupProcess = action.payload;
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

export const signupSelector = createDraftSafeSelector(
  (state: RootState) => state.user.signupProcess,
  (state: RootState) => state.user.signupStepInfo,
  (state: RootState) => state.user.signupStepMoreInfo,
  (state: RootState) => state.user.signupStepGymInfo,
  (state: RootState) => state.user.signupStepFriendsInfo,
  (state: RootState) => state.user.selectedGym,
  (
    signupProcess,
    signupStepInfo,
    signupStepMoreInfo,
    signupStepGymInfo,
    signupStepFriendsInfo,
    selectedGym,
  ) => ({
    signupProcess,
    signupStepInfo,
    signupStepMoreInfo,
    signupStepGymInfo,
    signupStepFriendsInfo,
    selectedGym,
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
  addLikeRequest,
  addLikeSuccess,
  addLikeError,
  changeNickname,
} = userSlice.actions
export default userSlice.reducer;
