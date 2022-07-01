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
  Cancel: {
    RequestId: number;
    ResponseId: number;
    ScheduleId: number;
    createdAt: string;
    id: number;
    isCanceled: boolean;
    updatedAt: string;
  };
  Receiver: {
    id: number;
    nickname: string;
    Image: Image;
    Userdetail: { description };
  };
  Gym: { id: number; address: string; name: string; addressRoad?: string };
  Requester: {
    id: number;
    nickname: string;
    Image: Image;
    Userdetail: { description };
  };
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
  lastYn?: number;
}

export interface MatchingDetail extends MatchingCardProps {
  Friend?: {
    id: number;
    nickname: string;
    Image?: Image;
    Userdetail: { description: string };
  };
}

export interface MatchingReqFormProps {
  friend?: {
    id: number;
    nickname: string;
    Userdetail: { description: string };
    Image?: Image;
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
  selectedUser: UserGym | null;
  gymName?: string;
}

export interface UpdateCancelAPI {
  id?: number | null;
  friendId?: number;
  cancelId?: number;
}

export interface RealtimeAPI {
  id: number;
  Gym: { address: string; addressRoad: string; name: string };
  Receiver: { id: number; nickname: string; Image: Image };
  Requester: { id: number; nickname: string; Image: Image };
  Cancel: ScheduledetailModel;
}

export interface PermissionAPI {
  scheduleId?: number;
  permission: boolean;
  friendId?: number;
}

export type RecordPage = Array<{
  start: Date;
  end: Date;
  nextCursor: number;
  id: number;
  description: string;
  endDate: string;
  isPermitted: boolean;
  permission: boolean;
  startDate: string;
  Cancel: {
    RequestId: number;
    ResponseId: number;
    ScheduleId: number;
    createdAt: string;
    id: number;
    isCanceled: boolean;
    updatedAt: string;
  } | null;
  Receiver: {
    id: number;
    nickname: string;
    Image: Image;
    Userdetail: { description: string };
  };
  Gym: {
    id: number;
    address: string;
    name: string;
    addressRoad?: string;
  };
  Requester: {
    id: number;
    nickname: string;
    Image: Image;
    Userdetail: { description: string };
  };
}>;

export interface RecordPages {
  pageParams: unknown[];
  pages: RecordPage[];
}
