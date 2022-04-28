import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { BiX } from 'react-icons/bi';

import { useModalDispatch } from '@/../store/modalStore';
import { gymSelector } from '@/../reducers/gym';
import { addLikeAPI } from '@/api/user';
import { gymAndFriendsByIdKey, meKey } from '@/../@utils/queryKey';
import { ButtonType, GlobalModal, ModalStatus } from '@/../@types/utils';
import { UserGym, SelectedGymUser, SearchFriendsProps } from '@/../@types/user';
import { Icon, Button } from '@/components/atoms';
import { PropfileCard } from '@/components/molecules';
import { rematchRate } from '@/../@utils/calculation';
import { useLoadLoginedUser } from '@/hooks';
import ModalPortal from '../ModalPortal';
import ModalMatchingRequest from '../ModalMatchingRequest';
import {
  FriendsListWrapper,
  SearchFriendsWrapper,
  SearchHeader,
  SearchTitle,
} from './style';

const SearchFriends = ({
  isLoading,
  foldedGym,
  foldedFriends,
  setFoldedFriends,
}: SearchFriendsProps) => {
  const queryClient = useQueryClient();
  const contextDispatch = useModalDispatch();
  const { gym } = useSelector(gymSelector);

  const [friend, setFriend] = useState<UserGym>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: me } = useLoadLoginedUser();

  const likeMutation = useMutation((data: number) => addLikeAPI(data), {
    onSuccess: () => {
      void queryClient.invalidateQueries(meKey);
      void queryClient.invalidateQueries(gymAndFriendsByIdKey(gym.id));
    },
  });

  const onChangeFoldedFriends = useCallback(() => {
    setFoldedFriends((prev) => !prev);
  }, [foldedFriends]);

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
      <SearchFriendsWrapper foldedGym={foldedGym} foldedFriends={foldedFriends}>
        <SearchHeader>
          <SearchTitle>{gym?.name} 친구검색 결과</SearchTitle>
          <Button
            icon={<Icon icon={<BiX />} />}
            type={ButtonType.TEXT}
            onClick={onChangeFoldedFriends}
          />
        </SearchHeader>
        <FriendsListWrapper>
          {gym?.Users &&
            gym?.Users.map((user: SelectedGymUser) => {
              const imageSrc = user.Image?.src ?? '';
              const percent = rematchRate(user.totalCount, user.rematchCount);
              const isCheckedLike = !!user.Liker.find((l) => l.id === me?.id);
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
        </FriendsListWrapper>
      </SearchFriendsWrapper>
      <ModalPortal>
        {showModal && (
          <ModalMatchingRequest setShowModal={setShowModal} friend={friend} />
        )}
      </ModalPortal>
    </>
  );
};

export default SearchFriends;
