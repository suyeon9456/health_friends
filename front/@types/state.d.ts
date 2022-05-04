import { Gyms } from './gym';
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
import { SignupMenuType } from './utils';

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
}

/* GYM INITIAL STATE */
export interface GymInitialState {
  isLoadGyms: boolean;
  hasMoreGyms: boolean;
  mapBounds: {} | null;
  gyms: Gyms | [];
  gym: {};
}
