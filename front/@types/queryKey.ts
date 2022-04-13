export const meKey = ['user'] as const;

export const profileKey = ['profile'] as const;
export const profileByIdKey = (profileId?: string | string[]) =>
  ['todos', profileId] as const;

export const signupGymsKey = (searchWord?: string) =>
  ['signup', 'gym', searchWord] as const;
export const gymsKey = ({
  lastId,
  searchWord,
  swLon,
  swLat,
  neLon,
  neLat,
  isLoadGyms,
  isSearch,
}: {
  lastId?: number;
  searchWord?: string;
  swLon?: string;
  swLat?: string;
  neLon?: string;
  neLat?: string;
  isLoadGyms?: boolean;
  isSearch?: boolean;
}) =>
  [
    'gym',
    lastId,
    searchWord,
    swLon,
    swLat,
    neLon,
    neLat,
    isLoadGyms,
    isSearch,
  ] as const;
export const gymAndFriendsByIdKey = (gymId?: number) => ['gym', gymId] as const;
