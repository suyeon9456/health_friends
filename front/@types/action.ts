export interface LoadGymProps {
  lastId?: number;
  searchWord: string;
  swLon?: string;
  swLat?: string;
  neLon?: string;
  neLat?: string;
}

export interface LoadSchedulesProps {
  profileMenu: string;
  limit: number;
  term: string[];
  type: string[];
  status: string[];
  rejectedMatching: boolean;
}

export interface UpdateCancellationProps {
  id?: number | null;
  friendId?: number;
  cancelId?: number;
}

export interface ActionType<T, D> {
  type: T;
  data?: D;
}

export interface CustomActionType<T, D, C> extends ActionType<T, D> {
  lastId: C;
}
