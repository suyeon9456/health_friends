import { Gyms } from '../gym';
import { Schedules } from '../schedule';
import { Me, Profile, RealtimeMatching, SignupFriendsInfo, SignupGymInfo, SignupInfo, SignupMoreInfo } from '../user';

type SignupSteps = [
  { id: 1, type: 'process', step: 1, title: 'STEP1', description: '회원 정보' },
  { id: 2, type: 'wait', step: 2, title: 'STEP2', description: '추가 정보' },
  { id: 3, type: 'wait', step: 3, title: 'STEP3', description: '추가 정보' },
  { id: 4, type: 'wait', step: 4, title: 'STEP4', description: '매칭되고 싶은 친구 정보' },
]

type AgeOptions = [
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
]

type CareerOptions = [
  { value: 1, text: '1년 미만' },
  { value: 2, text: '1년 이상 ~ 3년 미만' },
  { value: 3, text: '3년 이상 ~ 5년 미만' },
  { value: 4, text: '5년 이상 ~ 10년 미만' },
  { value: 5, text: '10년 이상' },
]

type RoleOptions = [
  { value: 1, text: '도움을 주고 싶어요!' },
  { value: 2, text: '도움을 받고 싶어요!' },
  { value: 3, text: '함께 운동하고 싶어요!' },
]

type GenderOptions = [
  { value: 'male', text: '남성' },
  { value: 'female', text: '여성' },
]

/* USER INITIAL STATE */
export type UserInitialState = {
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: string | null;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: string | null;
  signupLoading: boolean;
  signupDone: boolean;
  signupError: string | null;
  loadRecommendFriendsLoading: boolean;
  loadRecommendFriendsDone: boolean;
  loadRecommendFriendsError: string | null;
  loadRankedFriendsLoading: boolean;
  loadRankedFriendsDone: boolean;
  loadRankedFriendsError: string | null;
  loadRealtimeMatchingLoading: boolean;
  loadRealtimeMatchingDone: boolean;
  loadRealtimeMatchingError: string | null;
  addLikeLoading: boolean;
  addLikeDone: boolean;
  addLikeError: string | null;
  loadLikeLoading: boolean;
  loadLikeDone: boolean;
  loadLikeError: string | null;
  signupSteps: SignupSteps;
  ageOptions: AgeOptions;
  careerOptions: CareerOptions;
  roleOptions: RoleOptions;
  genderOptions: GenderOtions;
  searchGymTabs: SearchGymTabs;
  signupProcess: SignupProcess;
  signupStepInfo: SignupInfo | null;
  signupStepMoreInfo: SignupMoreInfo | null;
  signupStepGymInfo: SignupGymInfo | null;
  signupStepFriendsInfo: SignupFriendsInfo| null;
  selectedGym: {} | null;
  me: Me | null;
  recommendedFriends: [];
  closedFriends: [];
  additionalFriends: [];
  rankedFriends: {} | null;
  realtimeMatching: Array<RealtimeMatching> | null;
  likedFriends: Array<User> | null;
};

/* PROFILE INITIAL STATE */
export type ProfileInitialState = {
  loadInfoLoading: boolean;
  loadInfoDone: boolean;
  loadInfoError: string | null;
  loadMyinfoLoading: boolean;
  loadMyinfoDone: boolean;
  loadMyinfoError: string | null;
  updateMyInfoLoading: boolean;
  updateMyInfoDone: boolean;
  updateMyInfoError: string | null;
  updateMyFriendsInfoLoading: boolean;
  updateMyFriendsInfoDone: boolean;
  updateMyFriendsInfoError: string | null;
  updateMyNicknameLoading: boolean;
  updateMyNicknameDone: boolean;
  updateMyNicknameError: string | null;
  updateMyDescriptionLoading: boolean;
  updateMyDescriptionDone: boolean;
  updateMyDescriptionError: string | null;
  uploadProfileImageLoading: boolean;
  uploadProfileImageDone: boolean;
  uploadProfileImageError: string | null;
  addProfileImageLoading: boolean;
  addProfileImageDone: boolean;
  addProfileImageError: string | null;
  profile: Profile | null;
  imagePath: string | null;
}

/* GYM INITIAL STATE */
export type GymInitialState = {
  addGymLoading: boolean,
  addGymDone: boolean,
  addGymError: string | null,
  loadGymLoading: boolean,
  loadGymDone: boolean,
  loadGymError: string | null,
  loadFriendsLoading: boolean,
  loadFriendsDone: boolean,
  loadFriendsError: string | null,
  isLoadGyms: boolean,
  hasMoreGyms: boolean,
  mapBounds: {},
  gyms: Gyms | [],
  gym: {},
}

/* SCHEDULE INITIAL STATE */
export type ScheduleInitialState = {
  addScheduleLoading: boolean;
  addScheduleDone: boolean;
  addScheduleError: string | null;
  addReScheduleLoading: boolean;
  addReScheduleDone: boolean;
  addReScheduleError: string | null;
  loadSchedulesLoading: boolean;
  loadSchedulesDone: boolean;
  loadSchedulesError: string | null;
  loadCalendarSchedulesLoading: boolean;
  loadCalendarSchedulesDone: boolean;
  loadCalendarSchedulesError: string | null;
  loadScheduleLoading: boolean;
  loadScheduleDone: boolean;
  loadScheduleError: string | null;
  updateScheduleLoading: boolean;
  updateScheduleDone: boolean;
  updateScheduleError: string | null;
  updatePermissionLoading: boolean;
  updatePermissionDone: boolean;
  updatePermissionError: string | null;
  addCancellationLoading: boolean;
  addCancellationDone: boolean;
  addCancellationError: string | null;
  updateCancellationLoading: boolean;
  updateCancellationDone: boolean;
  updateCancellationError: string | null;
  addPermissionLoading: boolean;
  addPermissionDone: boolean;
  addPermissionError: string | null;
  schedules: Schedules | [];
  schedulesCount: number;
  schedule: Schedule | null;
}

