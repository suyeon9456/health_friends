import { Gym, Gyms } from './gym';
import { Schedules } from './schedule';
import {
  Me,
  Profile,
  RealtimeMatching,
  SignupFriendsInfo,
  SignupGymInfo,
  SignupInfo,
  SignupMoreInfo,
} from './user';
import { ProfileMenuType, SignupMenuType } from './constant';

/* USER INITIAL STATE */
export interface UserInitialState {
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
  profile: Profile | null;
  tab: ProfileMenuType;
}

/* GYM INITIAL STATE */
export interface GymInitialState {
  isLoadGyms: boolean;
  hasMoreGyms: boolean;
  mapBounds: {} | null;
  gyms: Gyms | [];
  gym: {};
  isFoldedGym: boolean;
  isFoldedFriends: boolean;
  selectedGym: Gym | null;
}
