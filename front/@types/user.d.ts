import { Dispatch, SetStateAction } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { InfoContentType } from './constant';
import { Image } from './image';
import { Schedule } from './schedule';

export type Gender = 'female' | 'male';
export type Age = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
export type Career = '1' | '2' | '3' | '4' | '5';
export type Role = '1' | '2' | '3';

export interface User {
  id: number;
  email?: string;
  password?: string;
  nickname: string;
  gender?: Gender;
  age?: Age;
  career?: Career;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
  Userdetail?: Userdetail;
}

export interface Userdetail {
  id: number;
  startTime: string;
  endTime: string;
  description: string;
  friendsGender: Gender;
  friendsAge: Age;
  friendsCareer: Career;
  friendsRole: Role;
  UserId?: number;
}

export interface Me extends User {
  Userdetail?: Userdetail;
  Image: Image;
}

export interface UserInfo extends Me {}

export interface FetchProfile extends Me {
  matching: Array<{
    FriendId: number;
    matchingCount: number;
    rematchingCount: number;
  }>;
  myinfo?: {
    Liked: Array<{ id: number }>;
  };
  user?: {
    Liked: Array<{ id: number }>;
  };
}

export interface Profile extends Me {
  Gyms: Gym;
  Schedule: Schedule;
  Liked: number[];
  matchingTotalCount: number;
  matchingRecount: number;
  mathcing: number[];
  resSchedule: Array<{
    FriendId: number;
    id: number;
    isPermitted: boolean;
    permission: boolean;
  }>;
}

export interface SelectedGymUser extends Me {
  totalCount: number;
  rematchCount: number;
  Liker?: Array<{ id?: number }>;
}

export interface UserGym extends User {
  Gyms: Gym;
  Image: Image;
  UserGym: {
    createdAt: string;
    updatedAt: string;
    UserId: number;
    GymId: number;
  };
  Userdetail: Userdetail;
  reqSchedule: Array<{
    id: number;
    permission: boolean;
    RematchId: number | null;
  }>;
  resSchedule: Array<{
    id: number;
    permission: boolean;
    RematchId: number | null;
  }>;
}

export interface RankedFriends extends User {
  Userdetail?: { id: number; rematchingRate: number };
  resSchedule?: number[];
}

export interface SignupInfo {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

export interface SignupMoreInfo {
  gender?: string;
  age?: number;
  career?: number;
  role?: number;
}

export interface SignupGymInfo {
  startTime?: Date;
  endTime?: Date;
  gym?: string;
  description?: string;
}

export interface SignupFriendsInfo {
  friendsGender?: string;
  friendsCareer?: number;
  friendsAge?: number;
  friendsRole?: number;
}

export interface SignupData {
  signupInfo: SignupInfo;
  signupMoreInfo: SignupMoreInfo;
  signupGymInfo: SignupGymInfo;
  signupFriendsInfo: SignupFriendsInfo;
}

export interface EditProfileProps {
  type: InfoContentType;
  control: Control<
    {
      startTime: Date;
      endTime: Date;
      gender: string;
      age: string;
      career: string;
      role: string;
    },
    object
  >;
}

export interface SignupSteps {
  selectedGym: {};
  signupStepInfo: SignupInfo;
  signupStepMoreInfo: SignupMoreInfo;
  signupStepGymInfo: SignupGymInfo;
  signupStepFriendsInfo: SignupFriendsInfo;
}

export interface SignupMutationSteps {
  selectedGym: {};
  info: SignupInfo;
  moreInfo: SignupMoreInfo;
  gymInfo: SignupGymInfo;
  friendsInfo: SignupFriendsInfo;
}

export interface RecommendFriendsAPI {
  fullFriends: UserGym[];
  closedFriends: UserGym[];
}

export interface RankedFriendsAPI {
  matching: Mathcing[];
  rematching: Rematching[];
}

export interface LikedFriendAPI extends User {
  Image: Image;
}
