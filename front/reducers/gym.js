import produce from 'immer';

const initialState = {
  addGymLoading: false,
  addGymDone: false,
  addGymError: null,
  loadGymLoading: false,
  loadGymDone: false,
  loadGymError: null,
  loadFriendsLoading: false,
  loadFriendsDone: false,
  loadFriendsError: null,
  hasMoreGyms: false,
  swLon: null,
  swLat: null,
  neLon: null,
  neLat: null,
  gyms: [],
  gym: {},
};

export const ADD_GYM_REQUEST = 'ADD_GYM_REQUEST';
export const ADD_GYM_SUCCESS = 'ADD_GYM_SUCCESS';
export const ADD_GYM_ERROR = 'ADD_GYM_ERROR';

export const LOAD_GYM_REQUEST = 'LOAD_GYM_REQUEST';
export const LOAD_GYM_SUCCESS = 'LOAD_GYM_SUCCESS';
export const LOAD_GYM_ERROR = 'LOAD_GYM_ERROR';

export const LOAD_FRIENDS_REQUEST = 'LOAD_FRIENDS_REQUEST';
export const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS';
export const LOAD_FRIENDS_ERROR = 'LOAD_FRIENDS_ERROR';

export const CHANGE_MAP_BOUNDS = 'CHANGE_MAP_BOUNDS';

const reducer = (state = initialState, action) => (produce(state, (draft) => {
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
      draft.addGymError = draft.error;
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
      break;
    case LOAD_GYM_ERROR:
      draft.loadGymLoading = false;
      draft.loadGymDone = false;
      draft.loadGymError = draft.error;
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
      draft.loadFriendsError = draft.error;
      break;
    case CHANGE_MAP_BOUNDS:
      draft.swLon = action.data.swLon;
      draft.swLat = action.data.swLat;
      draft.neLon = action.data.neLon;
      draft.neLat = action.data.neLat;
      break;
    default:
      break;
  }
}));

export default reducer;
