import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { GymInitialState } from '../@types/reducer/state';
import { RootState } from '../store/configureStore';

const initialState: GymInitialState = {
  addGymLoading: false,
  addGymDone: false,
  addGymError: null,
  isLoadGyms: false,
  hasMoreGyms: false,
  mapBounds: {},
  gyms: [],
  gym: {},
};

const gymSlice = createSlice({
  name: 'GYM',
  initialState,
  reducers: {
    addGymRequeset(state, action) {
      state.addGymLoading = true;
      state.addGymDone = false;
      state.addGymError = null;
    },
    addGymSuccess(state) {
      state.addGymLoading = false;
      state.addGymDone = true;
      state.addGymError = null;
    },
    addGymError(state, action) {
      state.addGymLoading = false;
      state.addGymDone = false;
      state.addGymError = action.payload;
    },
    loadGyms(state, action) {
      state.gyms = action.payload;
      state.gym = {};
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
  },
});

export const gymSelector = createDraftSafeSelector(
  (state: RootState) => state.gym.loadFriendsLoading,
  (state: RootState) => state.gym.loadGymLoading,
  (state: RootState) => state.gym.isLoadGyms,
  (state: RootState) => state.gym.hasMoreGyms,
  (state: RootState) => state.gym.mapBounds,
  (state: RootState) => state.gym.gyms,
  (state: RootState) => state.gym.gym,
  (
    loadFriendsLoading,
    loadGymLoading,
    isLoadGyms,
    hasMoreGyms,
    mapBounds,
    gyms,
    gym
  ) => ({
    loadFriendsLoading,
    loadGymLoading,
    isLoadGyms,
    hasMoreGyms,
    mapBounds,
    gyms,
    gym,
  })
);

export const {
  addGymRequeset,
  addGymSuccess,
  addGymError,
  loadGyms,
  loadFriends,
  changeMapBounds,
  isLoadGyms,
} = gymSlice.actions;
export default gymSlice.reducer;
