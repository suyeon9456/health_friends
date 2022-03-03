import { ProfileInitialState } from "../@types/reducer/state";
import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../store/configureStore";

const initialState: ProfileInitialState = {
  loadInfoLoading: false,
  loadInfoDone: false,
  loadInfoError: null,
  loadMyinfoLoading: false,
  loadMyinfoDone: false,
  loadMyinfoError: null,
  updateMyInfoLoading: false,
  updateMyInfoDone: false,
  updateMyInfoError: null,
  updateMyFriendsInfoLoading: false,
  updateMyFriendsInfoDone: false,
  updateMyFriendsInfoError: null,
  updateMyNicknameLoading: false,
  updateMyNicknameDone: false,
  updateMyNicknameError: null,
  updateMyDescriptionLoading: false,
  updateMyDescriptionDone: false,
  updateMyDescriptionError: null,
  uploadProfileImageLoading: false,
  uploadProfileImageDone: false,
  uploadProfileImageError: null,
  addProfileImageLoading: false,
  addProfileImageDone: false,
  addProfileImageError: null,
  profile: null,
  imagePath: null,
};

const profileSlice = createSlice({
  name: 'PROFILE',
  initialState,
  reducers: {
    loadProfileInfoRequest(state, action) {
      state.loadInfoLoading = true;
      state.loadInfoDone = false;
      state.loadInfoError = null;
    },
    loadProfileInfoSuccess(state, action) {
      state.loadInfoLoading = false;
      state.loadInfoDone = true;
      state.loadInfoError = null;
      state.profile = action.payload;
    },
    loadProfileInfoError(state, action) {
      state.loadInfoLoading = false;
      state.loadInfoDone = false;
      state.loadInfoError = action.payload;
    },
    loadProfileMyinfoRequest(state) {
      state.loadMyinfoLoading = true;
      state.loadMyinfoDone = false;
      state.loadMyinfoError = null;
    },
    loadProfileMyinfoSuccess(state, action) {
      state.loadMyinfoLoading = false;
      state.loadMyinfoDone = true;
      state.loadMyinfoError = null;
      state.profile = { ...action.payload, Liked: action.payload.Liked.map(({ id }: { id: number }) => id) };
    },
    loadProfileMyinfoError(state, action) {
      state.updateMyInfoLoading = false;
      state.updateMyInfoDone = false;
      state.updateMyInfoError = action.payload;
    },
    updateMyinfoRequest(state, action) {
      state.updateMyInfoLoading = true;
      state.updateMyInfoDone = false;
      state.updateMyInfoError = null;
    },
    updateMyinfoSuccess(state, action) {
      state.updateMyInfoLoading = false;
      state.updateMyInfoDone = true;
      state.updateMyInfoError = null;
      state.profile = action.payload;
    },
    updateMyinfoError(state, action) {
      state.updateMyInfoLoading = false;
      state.updateMyInfoDone = false;
      state.updateMyInfoError = action.payload;
    },
    updateMyFriendsInfoRequest(state, action) {
      state.updateMyFriendsInfoLoading = true;
      state.updateMyFriendsInfoDone = false;
      state.updateMyFriendsInfoError = null;
    },
    updateMyFriendsInfoSuccess(state, action) {
      state.updateMyFriendsInfoLoading = false;
      state.updateMyFriendsInfoDone = true;
      state.updateMyFriendsInfoError = null;
      state.profile = action.payload;
    },
    updateMyFriendsInfoError(state, action) {
      state.updateMyFriendsInfoLoading = false;
      state.updateMyFriendsInfoDone = false;
      state.updateMyFriendsInfoError = action.payload;
    },
    updateMyNicknameRequest(state, action) {
      state.updateMyNicknameLoading = true;
      state.updateMyNicknameDone = false;
      state.updateMyNicknameError = null;
    },
    updateMyNicknameSuccess(state, action) {
      state.updateMyNicknameLoading = false;
      state.updateMyNicknameDone = true;
      state.updateMyNicknameError = null;
      state.profile!.nickname = action.payload;
    },
    updateMyNicknameError(state, action) {
      state.updateMyNicknameLoading = false;
      state.updateMyNicknameDone = false;
      state.updateMyNicknameError = action.payload;
    },
    updateMyDescriptionRequest(state, action) {
      state.updateMyDescriptionLoading = true;
      state.updateMyDescriptionDone = false;
      state.updateMyDescriptionError = null;
    },
    updateMyDescriptionSuccess(state, action) {
      state.updateMyDescriptionLoading = false;
      state.updateMyDescriptionDone = true;
      state.updateMyDescriptionError = null;
      state.profile!.Userdetail.description = action.payload;
    },
    updateMyDescriptionError(state, action) {
      state.updateMyDescriptionLoading = false;
      state.updateMyDescriptionDone = false;
      state.updateMyDescriptionError = action.payload;
    },
    uploadProfileImageRequest(state, action) {
      state.uploadProfileImageLoading = true;
      state.uploadProfileImageDone = false;
      state.uploadProfileImageError = null;
    },
    uploadProfileImageSuccess(state, action) {
      state.uploadProfileImageLoading = false;
      state.uploadProfileImageDone = true;
      state.uploadProfileImageError = null;
      state.imagePath = action.payload;
    },
    uploadProfileImageError(state, action) {
      state.uploadProfileImageLoading = false;
      state.uploadProfileImageDone = false;
      state.uploadProfileImageError = action.payload;
    },
    addProfileImageRequest(state, action) {
      state.addProfileImageLoading = true;
      state.addProfileImageDone = false;
      state.addProfileImageError = null;
    },
    addProfileImageSuccess(state, action) {
      state.addProfileImageLoading = false;
      state.addProfileImageDone = true;
      state.addProfileImageError = null;
      state.imagePath = action.payload;
      state.profile = action.payload;
      state.imagePath = null;
    },
    addProfileImageError(state, action) {
      state.addProfileImageLoading = false;
      state.addProfileImageDone = false;
      state.addProfileImageError = action.payload;
    },
    removeProfileImage(state) {
      state.imagePath = null;
    },
  },
});

export const profileSelector = createDraftSafeSelector(
  (state: RootState) => state.profile.updateMyNicknameDone,
  (state: RootState) => state.profile.updateMyDescriptionDone,
  (state: RootState) => state.profile.profile,
  (state: RootState) => state.profile.imagePath,
  (state: RootState) => state.profile.uploadProfileImageError,
  (
    updateMyNicknameDone,
    updateMyDescriptionDone,
    profile,
    imagePath,
    uploadProfileImageError,
  ) => ({
    updateMyNicknameDone,
    updateMyDescriptionDone,
    profile,
    imagePath,
    uploadProfileImageError,
  })
);

export const {
  loadProfileInfoRequest,
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
  addProfileImageError,
  removeProfileImage,
} = profileSlice.actions
export default profileSlice.reducer;
