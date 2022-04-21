import { Control, FieldErrors } from 'react-hook-form';
import { Gym, Gyms } from './gym';
import { Image } from './image';
import { User, UserGym } from './user';

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
  Requester: {
    id: string;
    nickname: string;
    Image: Image;
    Liker: User;
  };
  Receiver: {
    id: string;
    nickname: string;
    Image: Image;
  };
  Gym: Gym;
  Cancel?: ScheduledetailModel;
}

export interface ScheduledetailModel {
  id: number;
  isCanceled: boolean;
  RequestId: number;
  ResponseId: number;
  ScheduleId: number;
  createdAt: string;
  updatedAt: string;
}

interface MatchingAPI {
  count: number;
  id: number;
  nickname: string;
  reqSchedule: Array<{ id: number }>;
}

export interface RematchingAPI {
  id: number;
  nickname: string;
  Userdetail: { id: number; rematchingRate: number };
}

export interface RecordScheduleAPI {
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

export interface RecordSchedule extends RecordScheduleAPI {
  start: Date;
  end: Date;
}

export interface CalendarScheduleAPI extends Schedule {
  description: string;
  endDate: string;
  id: number;
  isPermitted: boolean;
  permission: boolean;
  startDate: string;
}

export interface CalendarEvent extends CalendarScheduleAPI {
  Gym: { address: string; name: string };
  address: string;
  gymName?: string;
  nickname: string;
  start: Date;
  end: Date;
}

export interface MatchingCardProps extends RecordScheduleAPI {
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
  schedule: RecordScheduleAPI;
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

export interface MatchingReqFormProps {
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

export interface ModalMatchingProps {
  setShowModal: (prop: boolean) => void;
  friend?: UserGym;
  gymName?: string;
}

export interface UpdateCancelAPI {
  id?: number | null;
  friendId?: number;
  cancelId?: number;
}
