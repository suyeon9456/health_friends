import { CalendarEvent } from "calendar";
import { Image } from "./image";
import { FriendsList, User } from "./user";

export interface Mathcing {
  id: number;
  nickname: string;
  reqSchedule: Array<{ id: number }>;
  resSchedule: Array<{ id: number }>;
}

export interface Rematching {
  id: number;
  nickname: string;
  Userdetail: {id: number, rematchingRate: number};
}

export interface FetchRecommendData {
  fullFriends: FriendsList; 
  closedFriends: FriendsList;
}

export interface FetchRankedFriends {
  matching: Array<Mathcing>;
  rematching: Array<Rematching>;
};

export interface LikedFriend extends User {
  Image: Image;
}

export type FetchLikedFriends = Array<LikedFriend>;

export interface RealtimeMatching extends User {
  reqSchedule: Array<{
    id: number;
    UserId: number;
    Receiver: {
      nickname: string;
      Image: Image;
    };
    Gym: { id: number; name: string };
  }>;
  Image: Image;
  Gyms?: Array<{ id: number; name: string }>;
  Friend?: Array<{ id: number; nickname: string; Image: Array<Image> }>;
}

// export interface RecordSchedule {
//   id: number;
//   description: string;
//   endDate: string;
//   isPermitted: boolean;
//   permission: boolean;
//   startDate: string;
//   Cancel?: {
//     RequestId: number;
//     ResponseId: number;
//     ScheduleId: number;
//     createdAt: string;
//     id: number;
//     isCanceled: boolean;
//     updatedAt: string;
//   };
//   Receiver: { id: number; nickname: string; Image: object };
//   Gym: { id: number; address: string; name: string };
//   Requester: { id: number; nickname: string; Image: object };
// };

// export type RecordSchedules = {
//   count: number;
//   schedules: Array<RecordSchedule>;
// };

export type ScheduleType = {
  schedule: RecordSchedule;
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

// export type MatchingCardSchedule

