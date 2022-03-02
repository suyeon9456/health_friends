import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { UserInitialState } from '../@types/reducer/state';

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

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    loadMyInfoRequest(state) {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    },
    loadMyInfoSuccess(state, action) {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = true;
      state.loadMyInfoError = null;
      state.me = action.payload;
    },
    loadMyInfoError(state, action) {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = action.payload;
    },
    loginRequest(state, action) {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    },
    loginSuccess(state, action) {
      state.loginLoading = false;
      state.loginDone = true;
      state.loginError = null;
      state.me = action.payload;
    },
    loginError(state, action) {
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = action.payload;
    },
    logoutRequest(state) {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },
    logoutSuccess(state) {
      state.logoutLoading = false;
      state.logoutDone = true;
      state.logoutError = null;
      state.me = null;
    },
    logoutError(state, action) {
      state.logoutLoading = false;
      state.logoutDone = false;
      state.logoutError = action.payload;
    },
    signupStepNext(state) {
      state.signupProcess += 1;
    },
    signupStepPrev(state) {
      state.signupProcess -= 1;
    },
    signupStepInfoSave(state, action) {
      state.signupStepInfo = action.payload;
    },
    signupStepMoreInfoSave(state, action) {
      state.signupStepMoreInfo = action.payload;
    },
    signupStepGymInfoSave(state, action) {
      state.signupStepGymInfo = action.payload;
    },
    signupStepFriendsInfoSave(state, action) {
      state.signupStepFriendsInfo = action.payload;
    },
    selectGym(state, action) {
      state.selectedGym = action.payload;
    },
    signupRequest(state, action) {
      state.signupLoading = true;
      state.signupDone = false;
      state.signupError = null;
    },
    signupSuccess(state) {
      state.signupLoading = false;
      state.signupDone = true;
      state.signupError = null;
      state.signupStepInfo = null;
      state.signupStepMoreInfo = null;
      state.signupStepGymInfo = null;
      state.signupStepFriendsInfo = null;
      state.selectedGym = null;
    },
    signupError(state, action) {
      state.signupLoading = false;
      state.signupDone = false;
      state.signupError = action.payload;
    },
    loadRecommendFriendsRequest(state, action) {
      state.loadRecommendFriendsLoading = true;
      state.loadRecommendFriendsDone = false;
      state.loadRecommendFriendsError = null;
    },
    loadRecommendFriendsSuccess(state, action) {
      const rFriends = action.payload.recommendFriends.concat(action.payload.additionalFriends);
      let recommendedFriends = null;
      state.loadRecommendFriendsLoading = false;
      state.loadRecommendFriendsDone = true;
      state.closedFriends = action.payload.recommendFriends;
      state.additionalFriends = action.payload.additionalFriends;
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
      state.recommendedFriends = rFriends.length < 4 ? recommendedFriends : rFriends;
    },
    loadRecommendFriendsError(state, action) {
      state.loadRecommendFriendsLoading = false;
      state.loadRecommendFriendsDone = false;
      state.loadRecommendFriendsError = action.payload;
    },
    loadRankedFriendsRequest(state) {
      state.loadRankedFriendsLoading = true;
      state.loadRankedFriendsDone = false;
      state.loadRankedFriendsError = null;
    },
    loadRankedFriendsSuccess(state, action) {
      const idGroup = _.groupBy(action.payload?.matching, 'id');
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
      state.loadRankedFriendsLoading = false;
      state.loadRankedFriendsDone = true;
      state.rankedFriends = {
        rematching: action.payload?.rematching,
        matching: _.orderBy(matching, ['count'], ['desc']),
      };
    },
    loadRankedFriendsError(state, action) {
      state.loadRankedFriendsLoading = false;
      state.loadRankedFriendsDone = false;
      state.loadRankedFriendsError = action.payload;
    },
    loadRealtimeMatchingRequest(state) {
      state.loadRealtimeMatchingLoading = true;
      state.loadRealtimeMatchingDone = false;
      state.loadRealtimeMatchingError = null;
    },
    loadRealtimeMatchingSuccess(state, action) {
      state.loadRealtimeMatchingLoading = false;
      state.loadRealtimeMatchingDone = true;
      state.realtimeMatching = action.payload;
    },
    loadRealtimeMatchingError(state, action) {
      state.loadRealtimeMatchingLoading = false;
      state.loadRealtimeMatchingDone = false;
      state.loadRealtimeMatchingError = action.payload;
    },
    addLikeRequest(state, action) {
      state.addLikeLoading = true;
      state.addLikeDone = false;
      state.addLikeError = null;
    },
    addLikeSuccess(state, action) {
      state.addLikeLoading = false;
      state.addLikeDone = true;
      state.addLikeError = null;
    },
    addLikeError(state, action) {
      state.addLikeLoading = false;
      state.addLikeDone = false;
      state.addLikeError = action.payload;
    },
    loadLikeRequest(state) {
      state.loadLikeLoading = true;
      state.loadLikeDone = false;
      state.loadLikeError = null;
    },
    loadLikeSuccess(state, action) {
      state.loadLikeLoading = false;
      state.loadLikeDone = true;
      state.loadLikeError = null;
    },
    loadLikeError(state, action) {
      state.loadLikeLoading = false;
      state.loadLikeDone = false;
      state.loadLikeError = action.payload;
    },
    changeNickname(state, action) {
      state.me!.nickname = action.payload;
    },
    // changeDescription(state, action) {
    //   state.me!.Userdetail.description = action.payload;
    // },
  }
});

export const {
  loadMyInfoRequest,
  loadMyInfoSuccess,
  loadMyInfoError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  signupStepNext,
  signupStepPrev,
  signupStepInfoSave,
  signupStepMoreInfoSave,
  signupStepGymInfoSave,
  signupStepFriendsInfoSave,
  selectGym,
  signupRequest,
  signupSuccess,
  signupError,
  loadRecommendFriendsRequest,
  loadRecommendFriendsSuccess,
  loadRecommendFriendsError,
  loadRankedFriendsRequest,
  loadRankedFriendsSuccess,
  loadRankedFriendsError,
  loadRealtimeMatchingRequest,
  loadRealtimeMatchingSuccess,
  loadRealtimeMatchingError,
  addLikeRequest,
  addLikeSuccess,
  addLikeError,
  loadLikeRequest,
  loadLikeSuccess,
  loadLikeError,
  changeNickname,
} = userSlice.actions
export default userSlice.reducer;
