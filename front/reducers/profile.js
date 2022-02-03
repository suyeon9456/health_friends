import produce from 'immer';
import * as _ from 'lodash';

const initialState = {
  loadProfileInfoLoading: false,
  loadProfileInfoDone: false,
  loadProfileInfoError: null,
  loadProfileMyinfoLoading: false,
  loadProfileMyinfoDone: false,
  loadProfileMyinfoError: null,
  updateMyInfoLoading: false,
  updateMyInfoDone: false,
  updateMyInfoError: null,
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
  loadLikeLoading: false,
  loadLikeDone: false,
  loadLikeError: null,
  profile: null,
  imagePath: null,
  likedFriends: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_ERROR = 'LOAD_MY_INFO_ERROR';

export const LOAD_PROFILE_INFO_REQUEST = 'LOAD_PROFILE_INFO_REQUEST';
export const LOAD_PROFILE_INFO_SUCCESS = 'LOAD_PROFILE_INFO_SUCCESS';
export const LOAD_PROFILE_INFO_ERROR = 'LOAD_PROFILE_INFO_ERROR';

export const LOAD_PROFILE_MYINFO_REQUEST = 'LOAD_PROFILE_MYINFO_REQUEST';
export const LOAD_PROFILE_MYINFO_SUCCESS = 'LOAD_PROFILE_MYINFO_SUCCESS';
export const LOAD_PROFILE_MYINFO_ERROR = 'LOAD_PROFILE_MYINFO_ERROR';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export const SIGN_UP_STEP_NEXT = 'SIGN_UP_STEP_NEXT';
export const SIGN_UP_STEP_PREV = 'SIGN_UP_STEP_PREV';

export const SIGN_UP_STEP_INFO_SAVE = 'SIGN_UP_STEP_INFO_SAVE';
export const SIGN_UP_STEP_MORE_INFO_SAVE = 'SIGN_UP_STEP_MORE_INFO_SAVE';
export const SIGN_UP_STEP_GYM_INFO_SAVE = 'SIGN_UP_STEP_GYM_INFO_SAVE';
export const SIGN_UP_STEP_FRIENDS_INFO_SAVE = 'SIGN_UP_STEP_FRIENDS_INFO_SAVE';

export const SELECT_GYM = 'SELECT_GYM';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_ERROR = 'UPDATE_MY_INFO_ERROR';

export const UPDATE_MY_FRIENDS_INFO_REQUEST = 'UPDATE_MY_FRIENDS_INFO_REQUEST';
export const UPDATE_MY_FRIENDS_INFO_SUCCESS = 'UPDATE_MY_FRIENDS_INFO_SUCCESS';
export const UPDATE_MY_FRIENDS_INFO_ERROR = 'UPDATE_MY_FRIENDS_INFO_ERROR';

export const UPDATE_MY_NICKNAME_REQUEST = 'UPDATE_MY_NICKNAME_REQUEST';
export const UPDATE_MY_NICKNAME_SUCCESS = 'UPDATE_MY_NICKNAME_SUCCESS';
export const UPDATE_MY_NICKNAME_ERROR = 'UPDATE_MY_NICKNAME_ERROR';

export const UPDATE_MY_DESCRIPTION_REQUEST = 'UPDATE_MY_DESCRIPTION_REQUEST';
export const UPDATE_MY_DESCRIPTION_SUCCESS = 'UPDATE_MY_DESCRIPTION_SUCCESS';
export const UPDATE_MY_DESCRIPTION_ERROR = 'UPDATE_MY_DESCRIPTION_ERROR';

export const UPLOAD_PROFILEIMAGE_REQUEST = 'UPLOAD_PROFILEIMAGE_REQUEST';
export const UPLOAD_PROFILEIMAGE_SUCCESS = 'UPLOAD_PROFILEIMAGE_SUCCESS';
export const UPLOAD_PROFILEIMAGE_ERROR = 'UPLOAD_PROFILEIMAGE_ERROR';

export const ADD_PROFILEIMAGE_REQUEST = 'ADD_PROFILEIMAGE_REQUEST';
export const ADD_PROFILEIMAGE_SUCCESS = 'ADD_PROFILEIMAGE_SUCCESS';
export const ADD_PROFILEIMAGE_ERROR = 'ADD_PROFILEIMAGE_ERROR';

export const LOAD_RECOMMEND_FRIENDS_REQUEST = 'LOAD_RECOMMEND_FRIENDS_REQUEST';
export const LOAD_RECOMMEND_FRIENDS_SUCCESS = 'LOAD_RECOMMEND_FRIENDS_SUCCESS';
export const LOAD_RECOMMEND_FRIENDS_ERROR = 'LOAD_RECOMMEND_FRIENDS_ERROR';

export const LOAD_RANKED_FRIENDS_REQUEST = 'LOAD_RANKED_FRIENDS_REQUEST';
export const LOAD_RANKED_FRIENDS_SUCCESS = 'LOAD_RANKED_FRIENDS_SUCCESS';
export const LOAD_RANKED_FRIENDS_ERROR = 'LOAD_RANKED_FRIENDS_ERROR';

export const LOAD_REALTIME_MATCHING_REQUEST = 'LOAD_REALTIME_MATCHING_REQUEST';
export const LOAD_REALTIME_MATCHING_SUCCESS = 'LOAD_REALTIME_MATCHING_SUCCESS';
export const LOAD_REALTIME_MATCHING_ERROR = 'LOAD_REALTIME_MATCHING_ERROR';

export const ADD_LIKE_REQUEST = 'ADD_LIKE_REQUEST';
export const ADD_LIKE_SUCCESS = 'ADD_LIKE_SUCCESS';
export const ADD_LIKE_ERROR = 'ADD_LIKE_ERROR';

export const LOAD_LIKE_REQUEST = 'LOAD_LIKE_REQUEST';
export const LOAD_LIKE_SUCCESS = 'LOAD_LIKE_SUCCESS';
export const LOAD_LIKE_ERROR = 'LOAD_LIKE_ERROR';

export const REMOVE_PROFILEIMAGE = 'REMOVE_PROFILEIMAGE';

const reducer = (state = initialState, action) => (produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoDone = false;
      draft.loadMyInfoError = null;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = true;
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_ERROR:
      draft.loadMyInfoError = action.error;
      draft.loadMyInfoLoading = false;
      break;
    case LOAD_PROFILE_INFO_REQUEST:
      draft.loadProfileInfoLoading = true;
      draft.loadProfileInfoDone = false;
      draft.loadProfileInfoError = null;
      break;
    case LOAD_PROFILE_INFO_SUCCESS:
      draft.loadProfileInfoLoading = false;
      draft.loadProfileInfoDone = true;
      draft.profile = action.data;
      break;
    case LOAD_PROFILE_INFO_ERROR:
      draft.loadProfileInfoError = action.error;
      draft.loadProfileInfoLoading = false;
      break;
    case LOAD_PROFILE_MYINFO_REQUEST:
      draft.loadProfileMyinfoLoading = true;
      draft.loadProfileMyinfoDone = false;
      draft.loadProfileMyinfoError = null;
      break;
    case LOAD_PROFILE_MYINFO_SUCCESS:
      draft.loadProfileMyinfoLoading = false;
      draft.loadProfileMyinfoDone = true;
      draft.profile = { ...action.data, Liked: action.data.Liked.map(({ id }) => id) };
      break;
    case LOAD_PROFILE_MYINFO_ERROR:
      draft.loadProfileMyinfoError = action.error;
      draft.loadProfileMyinfoLoading = false;
      break;
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = action.data;
      break;
    case LOG_IN_ERROR:
      draft.loginError = action.error;
      draft.loginLoading = false;
      break;
    case LOG_OUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_ERROR:
      draft.logoutError = action.error;
      draft.logoutLoading = false;
      break;
    case SIGN_UP_STEP_NEXT:
      draft.signupProcess += 1;
      break;
    case SIGN_UP_STEP_PREV:
      draft.signupProcess -= 1;
      break;
    case SIGN_UP_STEP_INFO_SAVE:
      draft.signupStepInfo = action.data;
      break;
    case SIGN_UP_STEP_MORE_INFO_SAVE:
      draft.signupStepMoreInfo = action.data;
      break;
    case SIGN_UP_STEP_GYM_INFO_SAVE:
      draft.signupStepGymInfo = action.data;
      break;
    case SIGN_UP_STEP_FRIENDS_INFO_SAVE:
      draft.signupStepFriendsInfo = action.data;
      break;
    case SELECT_GYM:
      draft.selectedGym = action.data;
      break;
    case SIGN_UP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      draft.signupStepInfo = null;
      draft.signupStepMoreInfo = null;
      draft.signupStepGymInfo = null;
      draft.signupStepFriendsInfo = null;
      draft.selectedGym = null;
      break;
    case SIGN_UP_ERROR:
      draft.signupLoading = false;
      draft.signupError = action.error;
      break;
    case UPDATE_MY_INFO_REQUEST:
      draft.updateMyInfoLoading = true;
      draft.updateMyInfoDone = false;
      draft.updateMyInfoError = null;
      break;
    case UPDATE_MY_INFO_SUCCESS:
      draft.updateMyInfoLoading = false;
      draft.updateMyInfoDone = true;
      draft.updateMyInfoError = null;
      draft.profile = action.data;
      // draft.me = action.data;
      break;
    case UPDATE_MY_INFO_ERROR:
      draft.updateMyInfoLoading = false;
      draft.updateMyInfoError = action.error;
      break;
    case UPDATE_MY_FRIENDS_INFO_REQUEST:
      draft.updateMyFriendsInfoLoading = true;
      draft.updateMyFriendsInfoDone = false;
      draft.updateMyFriendsInfoError = null;
      break;
    case UPDATE_MY_FRIENDS_INFO_SUCCESS:
      draft.updateMyFriendsInfoLoading = false;
      draft.updateMyFriendsInfoDone = true;
      draft.updateMyFriendsInfoError = null;
      draft.profile = action.data;
      // draft.me = action.data;
      break;
    case UPDATE_MY_FRIENDS_INFO_ERROR:
      draft.updateMyFriendsInfoLoading = false;
      draft.updateMyFriendsInfoError = action.error;
      break;
    case UPDATE_MY_NICKNAME_REQUEST:
      draft.updateMyNicknameLoading = true;
      draft.updateMyNicknameDone = false;
      draft.updateMyNicknameError = null;
      break;
    case UPDATE_MY_NICKNAME_SUCCESS:
      draft.updateMyNicknameLoading = false;
      draft.updateMyNicknameDone = true;
      draft.updateMyNicknameError = null;
      draft.me.nickname = action.data.nickname;
      draft.profile.nickname = action.data.nickname;
      break;
    case UPDATE_MY_NICKNAME_ERROR:
      draft.updateMyNicknameLoading = false;
      draft.updateMyNicknameError = action.error;
      break;
    case UPDATE_MY_DESCRIPTION_REQUEST:
      draft.updateMyDescriptionLoading = true;
      draft.updateMyDescriptionDone = false;
      draft.updateMyDescriptionError = null;
      break;
    case UPDATE_MY_DESCRIPTION_SUCCESS:
      draft.updateMyDescriptionLoading = false;
      draft.updateMyDescriptionDone = true;
      draft.updateMyDescriptionError = null;
      draft.me.description = action.data.description;
      draft.profile.Userdetail.description = action.data.description;
      break;
    case UPDATE_MY_DESCRIPTION_ERROR:
      draft.updateMyDescriptionLoading = false;
      draft.updateMyDescriptionError = action.error;
      break;
    case UPLOAD_PROFILEIMAGE_REQUEST:
      draft.uploadProfileImageLoading = true;
      draft.uploadProfileImageDone = false;
      draft.uploadProfileImageError = null;
      break;
    case UPLOAD_PROFILEIMAGE_SUCCESS:
      draft.uploadProfileImageLoading = false;
      draft.uploadProfileImageDone = true;
      draft.uploadProfileImageError = null;
      draft.imagePath = action.data;
      break;
    case UPLOAD_PROFILEIMAGE_ERROR:
      draft.uploadProfileImageLoading = false;
      draft.uploadProfileImageError = action.error;
      break;
    case ADD_PROFILEIMAGE_REQUEST:
      draft.addProfileImageLoading = true;
      draft.addProfileImageDone = false;
      draft.addProfileImageError = null;
      break;
    case ADD_PROFILEIMAGE_SUCCESS:
      draft.addProfileImageLoading = false;
      draft.addProfileImageDone = true;
      draft.addProfileImageError = null;
      draft.profile = action.data;
      draft.imagePath = null;
      break;
    case ADD_PROFILEIMAGE_ERROR:
      draft.addProfileImageLoading = false;
      draft.addProfileImageError = action.error;
      break;
    case LOAD_RECOMMEND_FRIENDS_REQUEST:
      draft.loadRecommendFriendsLoading = true;
      draft.loadRecommendFriendsDone = false;
      draft.loadRecommendFriendsError = null;
      break;
    case LOAD_RECOMMEND_FRIENDS_SUCCESS: {
      const rFriends = action.data.recommendFriends.concat(action.data.additionalFriends);
      let recommendedFriends = null;
      draft.loadRecommendFriendsLoading = false;
      draft.loadRecommendFriendsDone = true;
      draft.closedFriends = action.data.recommendFriends;
      draft.additionalFriends = action.data.additionalFriends;
      // draft.recommendedFriends = [];
      if (rFriends.length < 4) {
        recommendedFriends = rFriends
          .concat(Array.from({ length: (4 - rFriends.length) }, () => 0).map((_f, i) => {
            const key = `null${_f}${i}`;
            return (
              {
                id: key,
                Image: null,
                nickname: '추천친구 없음',
                Gyms: [{
                  address: '추천친구 없음',
                }],
              }
            );
          }));
      }
      draft.recommendedFriends = rFriends.length < 4 ? recommendedFriends : rFriends;
      break;
    }
    case LOAD_RECOMMEND_FRIENDS_ERROR:
      draft.loadRecommendFriendsError = action.error;
      draft.loadRecommendFriendsLoading = false;
      break;
    case LOAD_RANKED_FRIENDS_REQUEST:
      draft.loadRankedFriendsLoading = true;
      draft.loadRankedFriendsDone = false;
      draft.loadRankedFriendsError = null;
      break;
    case LOAD_RANKED_FRIENDS_SUCCESS: {
      const idGroup = _.groupBy(action.data?.matching, 'id');
      const matching = [];
      _.forIn(idGroup, (value) => {
        if (value.length > 1) {
          const req = { ...value[0],
            count: value[0].reqSchedule.length + value[1].resSchedule.length };
          return matching.push(req);
        }
        return matching.push({ ...value[0],
          count: value[0].reqSchedule?.length || 0 + value[0].resSchedule?.length || 0 });
      });
      draft.loadRankedFriendsLoading = false;
      draft.loadRankedFriendsDone = true;
      draft.rankedFriends = {
        rematching: action.data?.rematching,
        matching: _.orderBy(matching, ['count'], ['desc']),
      };
      break;
    }
    case LOAD_RANKED_FRIENDS_ERROR:
      draft.loadRankedFriendsError = action.error;
      draft.loadRankedFriendsLoading = false;
      break;
    case LOAD_REALTIME_MATCHING_REQUEST:
      draft.loadRealtimeMatchingLoading = true;
      draft.loadRealtimeMatchingDone = false;
      draft.loadRealtimeMatchingError = null;
      break;
    case LOAD_REALTIME_MATCHING_SUCCESS:
      draft.loadRealtimeMatchingLoading = false;
      draft.loadRealtimeMatchingDone = true;
      draft.realtimeMatching = action.data;
      break;
    case LOAD_REALTIME_MATCHING_ERROR:
      draft.loadRealtimeMatchingError = action.error;
      draft.loadRealtimeMatchingLoading = false;
      break;
    case ADD_LIKE_REQUEST:
      draft.addLikeLoading = true;
      draft.addLikeDone = false;
      draft.addLikeError = null;
      break;
    case ADD_LIKE_SUCCESS:
      draft.addLikeLoading = false;
      draft.addLikeDone = true;
      draft.addLikeError = null;
      break;
    case ADD_LIKE_ERROR:
      draft.addLikeError = action.error;
      draft.addLikeLoading = false;
      break;
    case LOAD_LIKE_REQUEST:
      draft.loadLikeLoading = true;
      draft.loadLikeDone = false;
      draft.loadLikeError = null;
      break;
    case LOAD_LIKE_SUCCESS:
      draft.loadLikeLoading = false;
      draft.loadLikeDone = true;
      draft.likedFriends = action.data;
      break;
    case LOAD_LIKE_ERROR:
      draft.loadLikeError = action.error;
      draft.loadLikeLoading = false;
      break;
    case REMOVE_PROFILEIMAGE:
      draft.imagePath = null;
      break;
    default:
      break;
  }
}));

export default reducer;