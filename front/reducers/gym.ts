import produce from 'immer';
import {
  ADD_GYM_REQUEST,
  ADD_GYM_SUCCESS,
  ADD_GYM_ERROR,
  LOAD_GYM_REQUEST,
  LOAD_GYM_SUCCESS,
  LOAD_GYM_ERROR,
  LOAD_FRIENDS_REQUEST,
  LOAD_FRIENDS_SUCCESS,
  LOAD_FRIENDS_ERROR,
  CHANGE_MAP_BOUNDS,
  IS_LOAD_GYMS,
} from '../@types/utils';
import { GymInitialState } from '../@types/reducer/state';
import { GymActions } from '../@types/action';

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

const reducer = (state = initialState, action: GymActions) => (produce(state, (draft) => {
  switch (action.type) {
    case ADD_GYM_REQUEST:
      draft.addGymLoading = true;
      draft.addGymDone = false;
      draft.addGymError = null;
      break;
    case ADD_GYM_SUCCESS:
      draft.addGymLoading = false;
      draft.addGymDone = true;
      draft.addGymError = null;
      break;
    case ADD_GYM_ERROR:
      draft.addGymLoading = false;
      draft.addGymDone = false;
      draft.addGymError = action.error;
      break;
    case LOAD_GYM_REQUEST:
      draft.loadGymLoading = true;
      draft.loadGymDone = false;
      draft.loadGymError = null;
      break;
    case LOAD_GYM_SUCCESS:
      draft.loadGymLoading = false;
      draft.loadGymDone = true;
      draft.loadGymError = null;
      draft.gyms = action.data;
      draft.gym = {};
      draft.isLoadGyms = false;
      break;
    case LOAD_GYM_ERROR:
      draft.loadGymLoading = false;
      draft.loadGymDone = false;
      draft.loadGymError = action.error;
      break;
    case LOAD_FRIENDS_REQUEST:
      draft.loadFriendsLoading = true;
      draft.loadFriendsDone = false;
      draft.loadFriendsError = null;
      break;
    case LOAD_FRIENDS_SUCCESS:
      draft.loadFriendsLoading = false;
      draft.loadFriendsDone = true;
      draft.loadFriendsError = null;
      draft.gym = action.data;
      break;
    case LOAD_FRIENDS_ERROR:
      draft.loadFriendsLoading = false;
      draft.loadFriendsDone = false;
      draft.loadFriendsError = action.error;
      break;
    case CHANGE_MAP_BOUNDS:
      draft.mapBounds = action.data;
      break;
    case IS_LOAD_GYMS:
      draft.isLoadGyms = action.data;
      break;
    default:
      break;
  }
}));

export default reducer;
