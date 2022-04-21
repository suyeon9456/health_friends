import { Location } from '../@types/gym';

export const meKey = ['user'] as const;

export const profileKey = ['profile'] as const;
export const profileByIdKey = (profileId?: string | string[]) =>
  ['todos', profileId] as const;

export const schedulesByIdKey = ({
  profileId,
  status,
  term,
  type,
  rejectedMatching,
}: {
  profileId: number;
  status: string[];
  term: string[];
  type: string[];
  rejectedMatching: boolean;
}) => ['record', profileId, status, term, type, rejectedMatching] as const;
export const scheduleByIdKey = (
  matchingId?: number | null,
  queryId?: string | string[],
  profileId?: number
) => ['schedule', matchingId, queryId, profileId] as const;

export const signupGymsKey = (searchWord?: string) =>
  ['signup', 'gym', searchWord] as const;
export const gymsKey = ({
  lastId,
  searchWord,
  isSearch,
}: {
  lastId?: number;
  searchWord?: string;
  isSearch?: boolean;
}) => ['gym', lastId, searchWord, isSearch] as const;
export const mapKey = ({
  lastId,
  searchWord,
  mapBounds,
  isLoadGyms,
}: {
  lastId?: number;
  searchWord?: string;
  mapBounds?: Location;
  isLoadGyms?: boolean;
}) => ['gym', lastId, searchWord, mapBounds, isLoadGyms] as const;
export const gymAndFriendsByIdKey = (gymId?: number) => ['gym', gymId] as const;
