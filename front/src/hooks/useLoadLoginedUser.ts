import { Me } from '@/../@types/user';
import { meKey } from '@/../@utils/queryKey';
import { loadLoginedUserAPI } from '@/api/user';
import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

const useLoadLoginedUser = (options?: {
  onSuccess?: (data: Me) => void;
}): UseQueryResult<Me, AxiosError<never>> => {
  return useQuery<Me, AxiosError>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export default useLoadLoginedUser;
