import produce from 'immer';

const initialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadProfileInfoLoading: false,
  loadProfileInfoDone: false,
  loadProfileInfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  updateMyInfoLoading: false,
  updateMyInfoDone: false,
  updateMyInfoError: null,
  updateMyFriendsInfoLoading: false,
  updateMyFriendsInfoDone: false,
  updateMyFriendsInfoError: null,
  updateMyNicknameLoading: false,
  updateMyNicknameDone: false,
  updateMyNicknameError: null,
  updateMyDescriptionLoading: false,
  updateMyDescriptionDone: false,
  updateMyDescriptionError: null,
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
  profile: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_ERROR = 'LOAD_MY_INFO_ERROR';

export const LOAD_PROFILE_INFO_REQUEST = 'LOAD_PROFILE_INFO_REQUEST';
export const LOAD_PROFILE_INFO_SUCCESS = 'LOAD_PROFILE_INFO_SUCCESS';
export const LOAD_PROFILE_INFO_ERROR = 'LOAD_PROFILE_INFO_ERROR';

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
      draft.me = action.data;
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
      draft.me = action.data;
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
      break;
    case UPDATE_MY_DESCRIPTION_ERROR:
      draft.updateMyDescriptionLoading = false;
      draft.updateMyDescriptionError = action.error;
      break;
    default:
      break;
  }
}));

export default reducer;
