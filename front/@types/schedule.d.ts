import { Gym, Gyms } from "./gym";
import { Image } from "./image";
import { User } from "./user";

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
  Friend?: {
    id: string;
    nickname: string;
    Image: Image;
  }
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

export type Schedules = Array<Schedule>;
