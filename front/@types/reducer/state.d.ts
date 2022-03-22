import { Gyms } from '../gym';
import { Schedules } from '../schedule';
import {
  Me,
  Profile,
  RealtimeMatching,
  SignupFriendsInfo,
  SignupGymInfo,
  SignupInfo,
  SignupMoreInfo,
} from '../user';
import { SignupMenuType } from '../utils';

/* USER INITIAL STATE */
export interface UserInitialState {
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: string | null;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: string | null;
  addLikeLoading: boolean;
  addLikeDone: boolean;
  addLikeError: string | null;
  signupProcess: SignupMenuType;
  signupStepInfo: SignupInfo | null;
  signupStepMoreInfo: SignupMoreInfo | null;
  signupStepGymInfo: SignupGymInfo | null;
  signupStepFriendsInfo: SignupFriendsInfo | null;
  selectedGym: {} | null;
  me: Me | null;
}

/* PROFILE INITIAL STATE */
export interface ProfileInitialState {
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
export interface GymInitialState {
  addGymLoading: boolean;
  addGymDone: boolean;
  addGymError: string | null;
  loadGymLoading: boolean;
  loadGymDone: boolean;
  loadGymError: string | null;
  loadFriendsLoading: boolean;
  loadFriendsDone: boolean;
  loadFriendsError: string | null;
  isLoadGyms: boolean;
  hasMoreGyms: boolean;
  mapBounds: {};
  gyms: Gyms | [];
  gym: {};
}

/* SCHEDULE INITIAL STATE */
export interface ScheduleInitialState {
  addScheduleLoading: boolean;
  addScheduleDone: boolean;
  addScheduleError: string | null;
  addReScheduleLoading: boolean;
  addReScheduleDone: boolean;
  addReScheduleError: string | null;
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
  schedule: Schedule | null;
}
