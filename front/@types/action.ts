export type LoadGymProps = {
  lastId?: number;
  searchWord: string;
  swLon?: string;
  swLat?: string;
  neLon?: string;
  neLat?: string;
}

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

export interface ActionType<T, D> {
  type: T;
  data?: D;
}

export interface CustomActionType<T, D, C> extends ActionType<T, D> {
  lastId: C
}