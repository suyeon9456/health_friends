/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { Menu } from '../@types/constant';
import { ProfileInitialState } from '../@types/state';
import { RootState } from '../store/configureStore';

const initialState: ProfileInitialState = {
  tab: Menu.INFO,
};

const profileSlice = createSlice({
  name: 'PROFILE',
  initialState,
  reducers: {
    updateTab(state, action) {
      state.tab = action.payload;
    },
  },
});

export const tabSelector = createDraftSafeSelector(
  (state: RootState) => state.profile.tab,
  (tab) => ({ tab })
);

export const { updateTab } = profileSlice.actions;
export default profileSlice.reducer;
