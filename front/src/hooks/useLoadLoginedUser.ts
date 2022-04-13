import { Me } from '@/../@types/user';
import { loadLoginedUserAPI } from '@/api/user';
import { useQuery } from 'react-query';

const useLoadLoginedUser = () => {
  return useQuery<Me>(['user'], () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useLoadLoginedUser;
