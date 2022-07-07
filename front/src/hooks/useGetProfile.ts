import { GlobalModal, ModalStatus } from '@/../@types/constant';
import { Profile } from '@/../@types/user';
import { profileByIdKey, profileKey } from '@/../@utils/queryKey';
import { useModalDispatch } from '@/../store/modalStore';
import { loadMyinfoAPI, loadProfileAPI } from '@/api/profile';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

const useGetProfile = (options?: {
  onSuccess?: (data: Profile) => void;
}): UseQueryResult<Profile, AxiosError<never>> => {
  const router = useRouter();
  const contextDispatch = useModalDispatch();

  const queryKey = useMemo(() => {
    return router.pathname === '/myinfo'
      ? profileKey
      : profileByIdKey(router.query.id);
  }, [router.query]);

  return useQuery(
    queryKey,
    () =>
      router.pathname !== '/myinfo'
        ? loadProfileAPI(router.query.id)
        : loadMyinfoAPI(),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000,
      notifyOnChangeProps: ['data'],
      onError: () =>
        contextDispatch({
          type: 'SHOW_MODAL',
          payload: {
            type: GlobalModal.ALERT,
            statusType: ModalStatus.ERROR,
            message: '존재하지 않는 사용자입니다.',
            block: true,
            callback: () => router.replace('/'),
          },
        }),
      ...options,
    }
  );
};

export default useGetProfile;
