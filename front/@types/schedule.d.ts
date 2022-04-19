import { Control, FieldErrors } from 'react-hook-form';
import { Gym, Gyms } from './gym';
import { Image } from './image';
import { Friends, User } from './user';

export interface ScheduleModel {
  id: number;
  startDate: Date;
  endDate: Date;
  description?: string;
  permission?: boolean;
  isPermitted?: boolean;
  UserId?: number;
  FriendId?: number;
  GymId?: number;
  RematchId?: number;
}

export interface Schedule extends ScheduleModel {
  Requester?: {
    id: string;
    nickname: string;
    Image: Image;
    Liker: User;
  };
  Receiver?: {
    id: string;
    nickname: string;
    Image: Image;
  };
  Gym: Gym;
  Cancel: ScheduledetailModel;
}

export interface ScheduledetailModel {
  id: number;
  isCanceled: boolean;
  RequestId: number;
  ResponseId: number;
  ScheduleId: number;
}

interface Matching {
  count: number;
  id: number;
  nickname: string;
  reqSchedule: Array<{ id: number }>;
}

export interface MatchingCount {
  FriendId: number;
  matchingCount: number;
  rematchingCount: number;
}

export type Schedules = Schedule[];

export type MatchingCounts = MatchingCount[];

export interface RecordScheduleFetch {
  id: number;
  description: string;
  endDate: string;
  isPermitted: boolean;
  permission: boolean;
  startDate: string;
  Cancel?: {
    RequestId: number;
    ResponseId: number;
    ScheduleId: number;
    createdAt: string;
    id: number;
    isCanceled: boolean;
    updatedAt: string;
  };
  Receiver: { id: number; nickname: string; Image: Image };
  Gym: { id: number; address: string; name: string };
  Requester: { id: number; nickname: string; Image: Image };
}

export interface RecordSchedule {
  id: number;
  isPermitted: boolean;
  description: string;
  endDate: string;
  isPermitted: boolean;
  permission: boolean;
  startDate: string;
  start: Date;
  end: Date;
  Cancel?: {
    RequestId: number;
    ResponseId: number;
    ScheduleId: number;
    createdAt: string;
    id: number;
    isCanceled: boolean;
    updatedAt: string;
  };
  Receiver: { id: number; nickname: string; Image: Image };
  Gym: { id: number; address: string; name: string };
  Requester: { id: number; nickname: string; Image: Image };
}

export interface CalendarScheduleFetch {
  Cancel?: {
    RequestId: number;
    ResponseId: number;
    ScheduleId: number;
    createdAt: string;
    id: number;
    isCanceled: boolean;
    updatedAt: string;
  };
  Receiver: { id: number; nickname: string; Image: object };
  Gym: { address: string; name: string };
  Requester: { id: number; nickname: string; Image: object };
  address: string;
  description: string;
  endDate: string;
  gymName?: string;
  id: number;
  isPermitted: boolean;
  nickname: string;
  permission: boolean;
  startDate: string;
}

export interface MatchingCardProps extends RecordScheduleFetch {
  start: Date;
  end: Date;
  userMathcing: number[];
  friendMathcing: number[];
  userTotalCount: number;
  userReCount: number;
  friendTotalCount: number;
  friendReCount: number;
  Friend: {
    id: number;
    nickname: string;
    Image?: Image;
  };
  lastYn?: number;
}

export interface ScheduleAPI {
  schedule: RecordScheduleFetch;
  userMatching: Array<{
    FriendId: number;
    matchingCount: number;
    rematchingCount: number;
  }>;
  friendMatching: Array<{
    FriendId: number;
    matchingCount: number;
    rematchingCount: number;
  }>;
}

export interface ReqMatchingFormProps {
  friend?: {
    nickname: string;
    Userdetail: { description: string };
    Image: { src: string };
  };
  control: Control<
    {
      startDate: Date;
      endDate: Date;
      gym: string;
      description: string;
    },
    object
  >;
  errors?: FieldErrors;
}

export interface ReqMatchingProps {
  setShowModal: (prop: boolean) => void;
  friend?: Friends;
  gymName?: string;
}
