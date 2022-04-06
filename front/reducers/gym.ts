import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { GymInitialState } from '../@types/reducer/state';
import { Image } from '../@types/image';
import { RootState } from '../store/configureStore';

const initialState: GymInitialState = {
  addGymLoading: false,
  addGymDone: false,
  addGymError: null,
  loadGymLoading: false,
  loadGymDone: false,
  loadGymError: null,
  loadFriendsLoading: false,
  loadFriendsDone: false,
  loadFriendsError: null,
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
    loadGymRequest(state, action) {
      state.loadGymLoading = true;
      state.loadGymDone = false;
      state.loadGymError = null;
    },
    loadGymSuccess(state, action) {
      state.loadGymLoading = false;
      state.loadGymDone = true;
      state.loadGymError = null;
      state.gyms = action.payload;
      state.gym = {};
      state.isLoadGyms = false;
    },
    loadGymError(state, action) {
      state.loadGymLoading = false;
      state.loadGymDone = false;
      state.loadGymError = action.payload;
    },
    loadFriendsRequest(state, action) {
      state.loadFriendsLoading = true;
      state.loadFriendsDone = false;
      state.loadFriendsError = null;
    },
    loadFriendsSuccess(state, action) {
      if (!action.payload) {
        return;
      }
      const { Users } = action.payload;
      state.loadFriendsLoading = false;
      state.loadFriendsDone = true;
      state.loadFriendsError = null;
      state.gym = {
        ...action.payload,
        Users: Users?.map(
          (user: {
            Image: Image;
            UserGym: {
              createdAt: string;
              updatedAt: string;
              UserId: number;
              GymId: number;
            };
            Userdetail: {
              startTime: string;
              endTime: string;
              description: string;
            };
            gender: 'femail' | 'male';
            id: number;
            nickname: string;
            reqSchedule: Array<{
              id: number;
              permission: boolean;
              RematchId: number | null;
            }>;
            resSchedule: Array<{
              id: number;
              permission: boolean;
              RematchId: number | null;
            }>;
          }) => {
            return {
              ...user,
              totalCount: user?.reqSchedule?.length + user?.resSchedule?.length,
              rematchCount:
                user?.reqSchedule?.filter(
                  (req) => !!req.permission && !!req.RematchId
                )?.length +
                user?.resSchedule?.filter(
                  (res) => !!res.permission && !!res.RematchId
                )?.length,
            };
          }
        ),
      };
    },
    loadFriendsError(state, action) {
      state.loadFriendsLoading = false;
      state.loadFriendsDone = false;
      state.loadFriendsError = action.payload;
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
  loadGymRequest,
  loadGymSuccess,
  loadGymError,
  loadFriendsRequest,
  loadFriendsSuccess,
  loadFriendsError,
  changeMapBounds,
  isLoadGyms,
} = gymSlice.actions;
export default gymSlice.reducer;
