import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useModalDispatch } from '@/../store/modalStore';
import { addLikeAPI, loadGymAndFriendsAPI } from '@/api/user';
import { gymAndFriendsByIdKey, meKey } from '@/../@utils/queryKey';
import { GlobalModal, ModalStatus } from '@/../@types/constant';
import { UserGym, SelectedGymUser } from '@/../@types/user';
import { PropfileCard } from '@/components/molecules';
import { useLoadLoginedUser } from '@/hooks';
import { gymSelector, loadFriends } from '@/../reducers/gym';
import { useDispatch, useSelector } from 'react-redux';
import { rematchRate } from '@/../@utils/calculation';

const FriendsList = ({
  setFriend,
  setShowModal,
}: {
  setFriend: Dispatch<SetStateAction<UserGym | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const contextDispatch = useModalDispatch();
  const { selectedGym } = useSelector(gymSelector);

  const { data: me } = useLoadLoginedUser();
  const { isLoading, data: friends } = useQuery(
    gymAndFriendsByIdKey(selectedGym?.id),
    () => loadGymAndFriendsAPI({ gymId: selectedGym?.id }),
    {
      onSuccess: (data) => dispatch(loadFriends(data)),
      refetchOnWindowFocus: false,
      enabled: !!selectedGym?.id,
    }
  );

  const likeMutation = useMutation((data: number) => addLikeAPI(data), {
    onSuccess: () => {
      void queryClient.invalidateQueries(meKey);
      void queryClient.invalidateQueries(gymAndFriendsByIdKey(selectedGym.id));
    },
  });

  const onShowMatchingModal = useCallback(
    (user) => () => {
      if (!me?.id) {
        contextDispatch({
          type: 'SHOW_MODAL',
          payload: {
            type: GlobalModal.ALERT,
            statusType: ModalStatus.WARNING,
            message: '로그인이 필요한 페이지입니다.',
            block: true,
          },
        });
        return;
      }
      setFriend(user);
      setShowModal(true);
    },
    [me?.id]
  );

  return (
    <>
      {friends?.Users?.map((user: SelectedGymUser) => {
        const imageSrc = user.Image?.src ?? '';
        const percent = rematchRate(user.totalCount, user.rematchCount);
        const isCheckedLike = !!user?.Liker?.find((l) => l.id === me?.id);
        return (
          <PropfileCard
            key={user.id}
            userId={user.id}
            image={imageSrc}
            nickname={user.nickname}
            percent={percent}
            isLoading={isLoading}
            isCheckedLike={isCheckedLike}
            onClick={onShowMatchingModal(user.id)}
            onLike={(userId: number) => likeMutation.mutate(userId)}
          />
        );
      })}
    </>
  );
};

export default FriendsList;