import produce from 'immer';
import * as _ from 'lodash';
import { UserActions } from '../@types/action';
import { UserInitialState } from '../@types/reducer/state';
import { LOAD_MY_INFO_ERROR, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_ERROR, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_ERROR, SIGN_UP_STEP_NEXT, SIGN_UP_STEP_PREV, SIGN_UP_STEP_INFO_SAVE, SIGN_UP_STEP_MORE_INFO_SAVE, SIGN_UP_STEP_GYM_INFO_SAVE, SIGN_UP_STEP_FRIENDS_INFO_SAVE, SELECT_GYM, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_ERROR, LOAD_RECOMMEND_FRIENDS_REQUEST, LOAD_RECOMMEND_FRIENDS_SUCCESS, LOAD_RECOMMEND_FRIENDS_ERROR, LOAD_RANKED_FRIENDS_SUCCESS, LOAD_RANKED_FRIENDS_ERROR, LOAD_REALTIME_MATCHING_REQUEST, LOAD_REALTIME_MATCHING_SUCCESS, LOAD_REALTIME_MATCHING_ERROR, ADD_LIKE_REQUEST, ADD_LIKE_SUCCESS, ADD_LIKE_ERROR, LOAD_LIKE_REQUEST, LOAD_LIKE_SUCCESS, LOAD_LIKE_ERROR, LOAD_RANKED_FRIENDS_REQUEST } from '../@types/utils';

const initialState: UserInitialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  loadRecommendFriendsLoading: false,
  loadRecommendFriendsDone: false,
  loadRecommendFriendsError: null,
  loadRankedFriendsLoading: false,
  loadRankedFriendsDone: false,
  loadRankedFriendsError: null,
  loadRealtimeMatchingLoading: false,
  loadRealtimeMatchingDone: false,
  loadRealtimeMatchingError: null,
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  loadLikeLoading: false,
  loadLikeDone: false,
  loadLikeError: null,
  signupSteps: [
    { id: 1, type: 'process', step: 1, title: 'STEP1', description: '회원 정보' },
    { id: 2, type: 'wait', step: 2, title: 'STEP2', description: '추가 정보' },
    { id: 3, type: 'wait', step: 3, title: 'STEP3', description: '추가 정보' },
    { id: 4, type: 'wait', step: 4, title: 'STEP4', description: '매칭되고 싶은 친구 정보' },
  ],
  ageOptions: [
    { value: 1, text: '10대' },
    { value: 2, text: '20대' },
    { value: 3, text: '30대' },
    { value: 4, text: '40대' },
    { value: 5, text: '50대' },
    { value: 6, text: '60대' },
    { value: 7, text: '70대' },
    { value: 8, text: '80대' },
    { value: 9, text: '90대' },
    { value: 10, text: '90대 이상' },
  ],
  careerOptions: [
    { value: 1, text: '1년 미만' },
    { value: 2, text: '1년 이상 ~ 3년 미만' },
    { value: 3, text: '3년 이상 ~ 5년 미만' },
    { value: 4, text: '5년 이상 ~ 10년 미만' },
    { value: 5, text: '10년 이상' },
  ],
  roleOptions: [
    { value: 1, text: '도움을 주고 싶어요!' },
    { value: 2, text: '도움을 받고 싶어요!' },
    { value: 3, text: '함께 운동하고 싶어요!' },
  ],
  genderOptions: [
    { value: 'male', text: '남성' },
    { value: 'female', text: '여성' },
  ],
  searchGymTabs: [{ value: 'search', text: '헬스장 찾기' }, { value: 'add', text: '헬스장 등록' }],
  signupProcess: 1,
  signupStepInfo: null,
  signupStepMoreInfo: null,
  signupStepGymInfo: null,
  signupStepFriendsInfo: null,
  selectedGym: null,
  me: null,
  recommendedFriends: [],
  closedFriends: [],
  additionalFriends: [],
  rankedFriends: null,
  realtimeMatching: null,
  likedFriends: null,
};

const reducer = (state = initialState, action: UserActions) => (produce(state, (draft) => {
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
                nickname: '추천친구 없음',
                Image: null,
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
    default:
      break;
  }
}));

export default reducer;
