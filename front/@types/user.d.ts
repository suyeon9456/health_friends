import { Dispatch, SetStateAction } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { Image } from './image';
import { Schedule } from './schedule';

// user에 대한 타입 또는 정보
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

export interface Profile extends User {
  Userdetail: Userdetail;
  Gyms: Gym;
  Schedule: Schedule;
  Image: Image;
  Liked: number[];
}

export interface Friends extends User {
  Image: Image | null;
  Gyms?: Gym[];
  Userdetail?: Userdetail;
  UserGym?: { GymId?: number };
}

export interface GymUsers extends User {
  totalCount: number;
  rematchCount: number;
  Image: { src: string };
  Userdetail?: Userdetail;
  Liker: Array<{ id: number }>;
}

export interface UserGym extends User {
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

export type FriendsList = Friends[];

interface EditInfoFormType extends FieldValues {
  startTime: Date;
  endTime: Date;
  gender: string;
  age: number;
  career: number;
  role: number;
}

export interface EditProfileProps {
  targetId: string;
  control: Control<EditInfoFormType, object>;
}

export interface SearchFriendsProps {
  isLoading: boolean;
  foldedGym: boolean;
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
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
