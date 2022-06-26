import { Me } from '@/../@types/user';
import { meKey } from '@/../@utils/queryKey';
import { loadLoginedUserAPI } from '@/api/user';
import { useQuery } from 'react-query';

const useLoadLoginedUser = (options?: { onSuccess?: (data: Me) => void }) => {
  return useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export default useLoadLoginedUser;
