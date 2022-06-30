/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { Menu } from '../@types/constant';
import { ProfileInitialState } from '../@types/state';
import { RootState } from '../store/configureStore';

const initialState: ProfileInitialState = {
  profile: null,
  tab: Menu.INFO,
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
    updateTab(state, action) {
      state.tab = action.payload;
    },
  },
});

export const profileSelector = createDraftSafeSelector(
  (state: RootState) => state.profile.profile,
  (profile) => ({ profile })
);

export const tabSelector = createDraftSafeSelector(
  (state: RootState) => state.profile.tab,
  (tab) => ({ tab })
);

export const { loadProfile, updateTab } = profileSlice.actions;
export default profileSlice.reducer;
