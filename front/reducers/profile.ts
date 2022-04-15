/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { ProfileInitialState } from '../@types/reducer/state';
import { RootState } from '../store/configureStore';

const initialState: ProfileInitialState = {
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
    loadProfile(state, action) {
      const { matching, user, myinfo } = action.payload;
      const matchingTotalCount = matching?.[0]?.matchingCount || 0;
      const matchingRecount = matching?.[0]?.rematchingCount || 0;
      if (!myinfo) {
        state.profile = {
          ...user,
          Liked: user.Liked?.map(({ id }: { id: number }) => id),
          matchingTotalCount,
          matchingRecount,
          mathcing: matching.map(
            ({ FriendId }: { FriendId: number }) => FriendId
          ),
        };
        return;
      }
      state.profile = {
        ...myinfo,
        Liked: myinfo.Liked?.map(({ id }: { id: number }) => id),
        matchingTotalCount,
        matchingRecount,
        mathcing: matching.map(
          ({ FriendId }: { FriendId: number }) => FriendId
        ),
      };
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
  (state: RootState) => state.profile.profile,
  (state: RootState) => state.profile.imagePath,
  (state: RootState) => state.profile.uploadProfileImageError,
  (profile, imagePath, uploadProfileImageError) => ({
    profile,
    imagePath,
    uploadProfileImageError,
  })
);

export const {
  loadProfile,
  uploadProfileImageRequest,
  uploadProfileImageSuccess,
  uploadProfileImageError,
  addProfileImageRequest,
  addProfileImageSuccess,
  addProfileImageError,
  removeProfileImage,
} = profileSlice.actions;
export default profileSlice.reducer;
