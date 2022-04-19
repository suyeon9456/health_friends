import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiX } from 'react-icons/bi';

import { gymSelector } from '@/../reducers/gym';
import { useModalDispatch } from '@/../store/modalStore';
import { ButtonType, GlobalModal, ModalStatus } from '@/../@types/utils';
import { Icon } from '@/components/atoms';
import useRematchRate from '@/hooks/useRematchRate';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Friends, GymUsers, Me, SearchFriendsProps } from '@/../@types/user';
import { addLikeAPI, loadLoginedUserAPI } from '@/api/user';
import { gymAndFriendsByIdKey, meKey } from '@/../@types/queryKey';
import { PropfileCard } from '../../molecules';
import Button from '../../atoms/Button';
import {
  FriendsListWrapper,
  SearchFriendsWrapper,
  SearchHeader,
  SearchTitle,
} from './style';
import ModalPortal from '../ModalPortal';
import ModalMatchingRequest from '../ModalMatchingRequest';

const SearchFriends = ({
  isLoading,
  foldedGym,
  foldedFriends,
  setFoldedFriends,
}: SearchFriendsProps) => {
  const contextDispatch = useModalDispatch();
  const { gym } = useSelector(gymSelector);

  const [friend, setFriend] = useState<Friends>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data: me } = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

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
            gym?.Users.map((user: GymUsers) => {
              const imageSrc = user?.Image?.src || '';
              const percent = user.rematchCount
                ? useRematchRate(user.rematchCount, user.totalCount)
                : 0;
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
