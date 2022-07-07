import { Location } from '../@types/map';

export const meKey = ['user'] as const;

export const profileKey = ['profile'] as const;
export const profileByIdKey = (profileId?: string | string[]) =>
  ['profile', profileId] as const;

export const schedulesByIdKey = ({
  profileId,
  status,
  term,
  type,
  isCanceled,
}: {
  profileId?: number;
  status: string[];
  term: string[];
  type: string[];
  isCanceled: boolean;
}) => ['record', profileId, status, term, type, isCanceled] as const;
export const scheduleByIdKey = (
  matchingId?: number | null,
  queryId?: string | string[],
  profileId?: number
) => ['schedule', matchingId, queryId, profileId] as const;

export const signupGymsKey = (searchWord?: string) =>
  ['signup', 'gym', searchWord] as const;

export const initialGymsKey = [
  'gyms',
  { searchWord: '', mapBounds: null },
] as const;

export const gymsKey = ({
  lastId,
  searchWord,
  mapBounds,
}: {
  lastId?: number;
  searchWord?: string;
  mapBounds?: Location | null;
}) => {
  if (searchWord === '' && mapBounds === null) {
    return initialGymsKey;
  }
  return ['gyms', { lastId, searchWord, mapBounds }] as const;
};
export const gymAndFriendsByIdKey = (gymId?: number) => ['gym', gymId] as const;

export const recommendKey = (location?: Location | null) =>
  [
    'recommend',
    location ?? {
      regionSiName: '',
      regionGuName: '',
      regionDongName: '',
      mainAddressNo: '',
    },
  ] as const;
