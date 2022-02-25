import { Address, Gym, Gyms } from "./gym";
import { Schedule, ScheduleModel, Schedules } from "./schedule";
import { Friends, Me, Profile, RankedFriends, RealtimeMatching, SignupFriendsInfo, SignupGymInfo, SignupMoreInfo, User } from "./user";
import { ADD_CANCELLATION_ERROR, ADD_CANCELLATION_REQUEST, ADD_CANCELLATION_SUCCESS, ADD_GYM_ERROR, ADD_GYM_REQUEST, ADD_GYM_SUCCESS, ADD_LIKE_ERROR, ADD_LIKE_REQUEST, ADD_LIKE_SUCCESS, ADD_PROFILEIMAGE_ERROR, ADD_PROFILEIMAGE_REQUEST, ADD_PROFILEIMAGE_SUCCESS, ADD_RE_SCHEDULE_ERROR, ADD_RE_SCHEDULE_REQUEST, ADD_RE_SCHEDULE_SUCCESS, ADD_SCHEDULE_ERROR, ADD_SCHEDULE_REQUEST, ADD_SCHEDULE_SUCCESS, CHANGE_MAP_BOUNDS, IS_LOAD_GYMS, LOAD_CALENDAR_SCHEDULES_ERROR, LOAD_CALENDAR_SCHEDULES_REQUEST, LOAD_CALENDAR_SCHEDULES_SUCCESS, LOAD_FRIENDS_ERROR, LOAD_FRIENDS_REQUEST, LOAD_FRIENDS_SUCCESS, LOAD_GYM_ERROR, LOAD_GYM_REQUEST, LOAD_GYM_SUCCESS, LOAD_LIKE_ERROR, LOAD_LIKE_REQUEST, LOAD_LIKE_SUCCESS, LOAD_MY_INFO_ERROR, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_PROFILE_INFO_ERROR, LOAD_PROFILE_INFO_REQUEST, LOAD_PROFILE_INFO_SUCCESS, LOAD_PROFILE_MYINFO_ERROR, LOAD_PROFILE_MYINFO_REQUEST, LOAD_PROFILE_MYINFO_SUCCESS, LOAD_RANKED_FRIENDS_ERROR, LOAD_RANKED_FRIENDS_REQUEST, LOAD_RANKED_FRIENDS_SUCCESS, LOAD_REALTIME_MATCHING_ERROR, LOAD_REALTIME_MATCHING_REQUEST, LOAD_REALTIME_MATCHING_SUCCESS, LOAD_RECOMMEND_FRIENDS_ERROR, LOAD_RECOMMEND_FRIENDS_REQUEST, LOAD_RECOMMEND_FRIENDS_SUCCESS, LOAD_SCHEDULES_ERROR, LOAD_SCHEDULES_REQUEST, LOAD_SCHEDULES_SUCCESS, LOAD_SCHEDULE_ERROR, LOAD_SCHEDULE_REQUEST, LOAD_SCHEDULE_SUCCESS, LOG_IN_ERROR, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_ERROR, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REMOVE_PROFILEIMAGE, SELECT_GYM, SIGN_UP_ERROR, SIGN_UP_REQUEST, SIGN_UP_STEP_FRIENDS_INFO_SAVE, SIGN_UP_STEP_GYM_INFO_SAVE, SIGN_UP_STEP_INFO_SAVE, SIGN_UP_STEP_MORE_INFO_SAVE, SIGN_UP_STEP_NEXT, SIGN_UP_STEP_PREV, SIGN_UP_SUCCESS, UPDATE_CANCELLATION_ERROR, UPDATE_CANCELLATION_REQUEST, UPDATE_CANCELLATION_SUCCESS, UPDATE_MY_DESCRIPTION_ERROR, UPDATE_MY_DESCRIPTION_REQUEST, UPDATE_MY_DESCRIPTION_SUCCESS, UPDATE_MY_FRIENDS_INFO_ERROR, UPDATE_MY_FRIENDS_INFO_REQUEST, UPDATE_MY_FRIENDS_INFO_SUCCESS, UPDATE_MY_INFO_ERROR, UPDATE_MY_INFO_REQUEST, UPDATE_MY_INFO_SUCCESS, UPDATE_MY_NICKNAME_ERROR, UPDATE_MY_NICKNAME_REQUEST, UPDATE_MY_NICKNAME_SUCCESS, UPDATE_PERMISSION_ERROR, UPDATE_PERMISSION_REQUEST, UPDATE_PERMISSION_SUCCESS, UPDATE_SCHEDULE_ERROR, UPDATE_SCHEDULE_REQUEST, UPDATE_SCHEDULE_SUCCESS, UPLOAD_PROFILEIMAGE_ERROR, UPLOAD_PROFILEIMAGE_REQUEST, UPLOAD_PROFILEIMAGE_SUCCESS } from "./utils";

/* USER ACTION */
export type UserActions = 
  | { type: typeof LOAD_MY_INFO_REQUEST }
  | { type: typeof LOAD_MY_INFO_SUCCESS, data: Me}
  | { type: typeof LOAD_MY_INFO_ERROR, error: string | null }
  | { type: typeof LOG_IN_REQUEST, data: { email: string; password: string } }
  | { type: typeof LOG_IN_SUCCESS, data: Me }
  | { type: typeof LOG_IN_ERROR, error: string | null }
  | { type: typeof LOG_OUT_REQUEST }
  | { type: typeof LOG_OUT_SUCCESS }
  | { type: typeof LOG_OUT_ERROR, error: string | null }
  | { type: typeof SIGN_UP_STEP_NEXT }
  | { type: typeof SIGN_UP_STEP_PREV }
  | { type: typeof SIGN_UP_STEP_INFO_SAVE, data: {} }
  | { type: typeof SIGN_UP_STEP_MORE_INFO_SAVE, data: {} }
  | { type: typeof SIGN_UP_STEP_GYM_INFO_SAVE, data: {} }
  | { type: typeof SIGN_UP_STEP_FRIENDS_INFO_SAVE, data: {} }
  | { type: typeof SELECT_GYM, data: {} }
  | { type: typeof SIGN_UP_REQUEST, data: {} }
  | { type: typeof SIGN_UP_SUCCESS, data: {} }
  | { type: typeof SIGN_UP_ERROR, error: string | null }
  | { type: typeof SIGN_UP_REQUEST, data: {} }
  | { type: typeof SIGN_UP_SUCCESS, data: {} }
  | { type: typeof SIGN_UP_ERROR, error: string | null }
  | { type: typeof LOAD_RECOMMEND_FRIENDS_REQUEST, data: { si: string; gu: string; dong: string; mainAddressNo: string; } }
  | { type: typeof LOAD_RECOMMEND_FRIENDS_SUCCESS, data: { recommendFriends: Array<Friends>; additionalFriends: Array<Friends> } }
  | { type: typeof LOAD_RECOMMEND_FRIENDS_ERROR, error: string | null }
  | { type: typeof LOAD_RANKED_FRIENDS_REQUEST }
  | { type: typeof LOAD_RANKED_FRIENDS_SUCCESS, data: { rematching: Array<RankedFriends>; matching: Array<RankedFriends> } }
  | { type: typeof LOAD_RANKED_FRIENDS_ERROR, error: string | null }
  | { type: typeof LOAD_REALTIME_MATCHING_REQUEST }
  | { type: typeof LOAD_REALTIME_MATCHING_SUCCESS, data: Array<RealtimeMatching> }
  | { type: typeof LOAD_REALTIME_MATCHING_ERROR, error: string | null }
  | { type: typeof ADD_LIKE_REQUEST, data: number }
  | { type: typeof ADD_LIKE_SUCCESS, data: User }
  | { type: typeof ADD_LIKE_ERROR, error: string | null }
  | { type: typeof LOAD_LIKE_REQUEST }
  | { type: typeof LOAD_LIKE_SUCCESS, data: Array<User> }
  | { type: typeof LOAD_LIKE_ERROR, error: string | null }

/* PROFILE ACTION */
export type ProfileActions =
  | { type: typeof LOAD_PROFILE_INFO_REQUEST, data: number }
  | { type: typeof LOAD_PROFILE_INFO_SUCCESS, data: Profile }
  | { type: typeof LOAD_PROFILE_INFO_ERROR, error: string | null }
  | { type: typeof LOAD_PROFILE_MYINFO_REQUEST }
  | { type: typeof LOAD_PROFILE_MYINFO_SUCCESS, data: Profile }
  | { type: typeof LOAD_PROFILE_MYINFO_ERROR, error: string | null }
  | { type: typeof UPDATE_MY_INFO_REQUEST, data: SignupMoreInfo & SignupGymInfo }
  | { type: typeof UPDATE_MY_INFO_SUCCESS, data: Profile }
  | { type: typeof UPDATE_MY_INFO_ERROR, error: string | null }
  | { type: typeof UPDATE_MY_FRIENDS_INFO_REQUEST, data: SignupFriendsInfo }
  | { type: typeof UPDATE_MY_FRIENDS_INFO_SUCCESS, data: Profile }
  | { type: typeof UPDATE_MY_FRIENDS_INFO_ERROR, error: string | null }
  | { type: typeof UPDATE_MY_NICKNAME_REQUEST, data: { nickname: string } }
  | { type: typeof UPDATE_MY_NICKNAME_SUCCESS, data: { nickname: string } }
  | { type: typeof UPDATE_MY_NICKNAME_ERROR, error: string | null }
  | { type: typeof UPDATE_MY_DESCRIPTION_REQUEST, data: { description: string } }
  | { type: typeof UPDATE_MY_DESCRIPTION_SUCCESS, data: { description: string } }
  | { type: typeof UPDATE_MY_DESCRIPTION_ERROR, error: string | null }
  | { type: typeof UPLOAD_PROFILEIMAGE_REQUEST, data: FormData }
  | { type: typeof UPLOAD_PROFILEIMAGE_SUCCESS, data: string }
  | { type: typeof UPLOAD_PROFILEIMAGE_ERROR, error: string | null }
  | { type: typeof ADD_PROFILEIMAGE_REQUEST, data: { image: string } }
  | { type: typeof ADD_PROFILEIMAGE_SUCCESS, data: Profile }
  | { type: typeof ADD_PROFILEIMAGE_ERROR, error: string | null }
  | { type: typeof REMOVE_PROFILEIMAGE }

export type LoadGymProps = {
  searchWord: string,
  swLon?: string,
  swLat?: string,
  neLon?: string,
  neLat?: string,
}

/* GYM ACTION */
export type GymActions =
  | { type: typeof ADD_GYM_REQUEST; data: Schedule }
  | { type: typeof ADD_GYM_SUCCESS; data: Gym }
  | { type: typeof ADD_GYM_ERROR; error: string | null }
  | { type: typeof LOAD_GYM_REQUEST; lastId: number ; data: LoadGymProps }
  | { type: typeof LOAD_GYM_SUCCESS; data: Gyms }
  | { type: typeof LOAD_GYM_ERROR; error: string | null }
  | { type: typeof LOAD_FRIENDS_REQUEST; data: { gymId: number }; lastId: number }
  | { type: typeof LOAD_FRIENDS_SUCCESS; data: Gym }
  | { type: typeof LOAD_FRIENDS_ERROR; error: string | null }
  | { type: typeof CHANGE_MAP_BOUNDS; data: Location }
  | { type: typeof IS_LOAD_GYMS; data: boolean }

export type LoadSchedulesProps = {
  profileMenu: string;
  limit: number;
  term: string[];
  type: string[];
  status: string[];
  rejectedMatching: boolean;
}

export type UpdateCancellationProps = {
  id: number;
  friendId: number;
  cancelId: number;
  userRematchRate: number;
  friendRematchRate: number;
}

/* SCHEDULE ACTION */
export type ScheduleActions =
  | { type: typeof ADD_SCHEDULE_REQUEST; data: Schedule }
  | { type: typeof ADD_SCHEDULE_SUCCESS; data: Schedule }
  | { type: typeof ADD_SCHEDULE_ERROR; error: string | null }
  | { type: typeof ADD_RE_SCHEDULE_REQUEST; data: Schedule }
  | { type: typeof ADD_RE_SCHEDULE_SUCCESS; data: Schedule }
  | { type: typeof ADD_RE_SCHEDULE_ERROR; error: string | null }
  | { type: typeof LOAD_SCHEDULES_REQUEST; data: LoadSchedulesProps }
  | { type: typeof LOAD_SCHEDULES_SUCCESS; data: { schedules: Schedules; count: number } }
  | { type: typeof LOAD_SCHEDULES_ERROR; error: string | null }
  | { type: typeof LOAD_CALENDAR_SCHEDULES_REQUEST; data: { start: string; end: string } }
  | { type: typeof LOAD_CALENDAR_SCHEDULES_SUCCESS; data: Schedules }
  | { type: typeof LOAD_CALENDAR_SCHEDULES_ERROR; error: string | null }
  | { type: typeof LOAD_SCHEDULE_REQUEST; data: number }
  | { type: typeof LOAD_SCHEDULE_SUCCESS; data: Schedule }
  | { type: typeof LOAD_SCHEDULE_ERROR; error: string | null }
  | { type: typeof UPDATE_SCHEDULE_REQUEST; data: ScheduleModel }
  | { type: typeof UPDATE_SCHEDULE_SUCCESS; data: Schedule }
  | { type: typeof UPDATE_SCHEDULE_ERROR; error: string | null }
  | { type: typeof UPDATE_PERMISSION_REQUEST; data: { scheduleId: number, permission: boolean } }
  | { type: typeof UPDATE_PERMISSION_SUCCESS; data: Schedule }
  | { type: typeof UPDATE_PERMISSION_ERROR; error: string | null }
  | { type: typeof ADD_CANCELLATION_REQUEST; data: { id: number } }
  | { type: typeof ADD_CANCELLATION_SUCCESS; data: Schedule }
  | { type: typeof ADD_CANCELLATION_ERROR; error: string | null }
  | { type: typeof UPDATE_CANCELLATION_REQUEST; data: UpdateCancellationProps }
  | { type: typeof UPDATE_CANCELLATION_SUCCESS; data: Schedule }
  | { type: typeof UPDATE_CANCELLATION_ERROR; error: string | null }

export interface ActionType<T, D> {
  type: T;
  data?: D;
}

export interface CustomActionType<T, D, C> extends ActionType<T, D> {
  lastId: C
}