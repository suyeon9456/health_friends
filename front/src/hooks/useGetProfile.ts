import { GlobalModal, ModalStatus } from '@/../@types/constant';
import { Profile } from '@/../@types/user';
import { profileKey } from '@/../@utils/queryKey';
import { useModalDispatch } from '@/../store/modalStore';
import { loadMyinfoAPI, loadProfileAPI } from '@/api/profile';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from 'react-query';

const useGetProfile = (
  id?: string | string[],
  options?: {
    onSuccess?: (data: Profile) => void;
  }
): UseQueryResult<Profile, AxiosError<never>> => {
  const router = useRouter();
  const contextDispatch = useModalDispatch();
  return useQuery(
    profileKey,
    () => (id ? loadProfileAPI(id) : loadMyinfoAPI()),
    {
      refetchOnWindowFocus: false,
      // onSuccess: (data) => dispatch(loadProfile(data)),
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
      useErrorBoundary: false,
    }
  );
};

export default useGetProfile;
