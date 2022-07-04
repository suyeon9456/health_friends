import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { UserInitialState } from '../@types/state';
import { SignupMenu } from '../@types/constant';
import { RootState } from '../store/configureStore';

const initialState: UserInitialState = {
  signupProcess: SignupMenu.INFO,
  signupStepInfo: null,
  signupStepMoreInfo: null,
  signupStepGymInfo: null,
  signupStepFriendsInfo: null,
  selectedGym: null,
  me: null,
  customModals: [],
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
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
    loadMe(state, action) {
      state.me = action.payload;
    },
    changeNickname(state, action) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.me!.nickname = action.payload;
    },
    showCustomModal(state, action) {
      state.customModals = [...state.customModals, action.payload];
    },
    hiddenCustomModal(state, action) {
      state.customModals = state.customModals.filter(
        (modalId) => modalId !== action.payload
      );
    },
  },
});

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
    selectedGym
  ) => ({
    signupProcess,
    signupStepInfo,
    signupStepMoreInfo,
    signupStepGymInfo,
    signupStepFriendsInfo,
    selectedGym,
  })
);

export const meSelector = createDraftSafeSelector(
  (state: RootState) => state.user.me,
  (me) => me
);

export const modalSelector = createDraftSafeSelector(
  (state: RootState) => state.user.customModals,
  (customModals) => ({ customModals })
);

export const {
  signupStepNext,
  signupStepPrev,
  signupStepInfoSave,
  signupStepMoreInfoSave,
  signupStepGymInfoSave,
  signupStepFriendsInfoSave,
  selectGym,
  loadMe,
  changeNickname,
  showCustomModal,
  hiddenCustomModal,
} = userSlice.actions;
export default userSlice.reducer;
