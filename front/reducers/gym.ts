import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { GymInitialState } from '../@types/state';
import { RootState } from '../store/configureStore';

const initialState: GymInitialState = {
  isLoadGyms: false,
  hasMoreGyms: false,
  mapBounds: null,
  gyms: null,
  gym: {},
  isFoldedGym: false,
  isFoldedFriends: true,
  selectedGym: null,
};

const gymSlice = createSlice({
  name: 'GYM',
  initialState,
  reducers: {
    loadGyms(state, action) {
      state.gyms = action.payload.data;
      if (!action.payload.selectedGym) {
        state.gym = {};
      }
      state.isLoadGyms = false;
    },
    loadGym(state, action) {
      state.gyms = action.payload;
      state.gym = {};
      state.isLoadGyms = false;
    },
    loadFriends(state, action) {
      state.gym = action.payload;
    },
    changeMapBounds(state, action) {
      state.mapBounds = action.payload;
    },
    isLoadGyms(state, action) {
      state.isLoadGyms = action.payload;
    },
    changeIsFoldedGym(state, action) {
      state.isFoldedGym = action.payload;
    },
    changeIsFoldedFriends(state, action) {
      console.log(action.payload);
      state.isFoldedFriends = action.payload;
    },
    changeSelectedGym(state, action) {
      state.selectedGym = action.payload;
    },
  },
});

export const gymSelector = createDraftSafeSelector(
  (state: RootState) => state.gym.isLoadGyms,
  (state: RootState) => state.gym.hasMoreGyms,
  (state: RootState) => state.gym.mapBounds,
  (state: RootState) => state.gym.gyms,
  (state: RootState) => state.gym.gym,
  (state: RootState) => state.gym.selectedGym,
  (isLoadGyms, hasMoreGyms, mapBounds, gyms, gym, selectedGym) => ({
    isLoadGyms,
    hasMoreGyms,
    mapBounds,
    gyms,
    gym,
    selectedGym,
  })
);

export const foldedItemSelector = createDraftSafeSelector(
  (state: RootState) => state.gym.isFoldedGym,
  (state: RootState) => state.gym.isFoldedFriends,
  (isFoldedGym, isFoldedFriends) => ({
    isFoldedGym,
    isFoldedFriends,
  })
);

export const {
  changeMapBounds,
  isLoadGyms,
  loadFriends,
  loadGyms,
  changeIsFoldedGym,
  changeIsFoldedFriends,
  changeSelectedGym,
} = gymSlice.actions;
export default gymSlice.reducer;
