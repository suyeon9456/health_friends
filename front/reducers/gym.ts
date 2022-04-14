import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { GymInitialState } from '../@types/reducer/state';
import { RootState } from '../store/configureStore';

const initialState: GymInitialState = {
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
    loadGyms(state, action) {
      console.log('reducer', action.payload);
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
      console.log('reducer');
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
  (state: RootState) => state.gym.isLoadGyms,
  (state: RootState) => state.gym.hasMoreGyms,
  (state: RootState) => state.gym.mapBounds,
  (state: RootState) => state.gym.gyms,
  (state: RootState) => state.gym.gym,
  (isLoadGyms, hasMoreGyms, mapBounds, gyms, gym) => ({
    isLoadGyms,
    hasMoreGyms,
    mapBounds,
    gyms,
    gym,
  })
);

export const { changeMapBounds, isLoadGyms, loadFriends, loadGyms } =
  gymSlice.actions;
export default gymSlice.reducer;
