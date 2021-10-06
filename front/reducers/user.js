import produce from 'immer';

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  signupSteps: [
    { id: 1, type: 'process', step: 1, title: 'STEP1', description: '회원 정보' },
    { id: 2, type: 'wait', step: 2, title: 'STEP2', description: '추가 정보' },
    { id: 3, type: 'wait', step: 3, title: 'STEP3', description: '추가 정보' },
    { id: 4, type: 'wait', step: 4, title: 'STEP4', description: '매칭되고 싶은 친구 정보' },
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
  searchGymTabs: [{ value: 1, text: '헬스장 찾기' }, { value: 2, text: '헬스장 등록' }],
  signupProcess: 1,
  signupStepInfo: null,
  signupStepMoreInfo: null,
  signupStepGymInfo: null,
  signupStepFriendsInfo: null,
  selectedGym: null,
  me: null,
};

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

const reducer = (state = initialState, action) => (produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      // draft.me = action.data;
      draft.me = {
        email: action.data.email,
        nickname: 'suyeon cho',
      };
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
      break;
    case SIGN_UP_ERROR:
      draft.signupLoading = false;
      draft.signupError = action.error;
      break;
    default:
      break;
  }
}));

export default reducer;
