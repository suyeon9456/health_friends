import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiX } from 'react-icons/bi';

import { gymSelector } from '@/../reducers/gym';
import { useModalDispatch } from '@/../store/modalStore';
import { ButtonType, GlobalModal, ModalStatus } from '@/../@types/utils';
import { Icon } from '@/components/atoms';
import useRematchRate from '@/hooks/useRematchRate';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Me } from '@/../@types/user';
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
}: {
  isLoading: boolean;
  foldedGym: boolean;
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
}) => {
  const contextDispatch = useModalDispatch();
  const { gym } = useSelector(gymSelector);

  const [friend, setFriend] = useState<{
    id?: number;
    nickname?: string;
    Userdetail?: object;
    Image?: object;
    UserGym?: { GymId?: number };
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data: me } = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const likeMutation = useMutation((data: number) => addLikeAPI(data), {
    onSuccess: () => {
      console.log('success');
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

  const onLike = useCallback(
    (userId: number) => likeMutation.mutate(userId),
    []
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
            gym?.Users.map(
              (user: {
                id: number;
                totalCount: number;
                rematchCount: number;
                nickname: string;
                Userdetail: {
                  description: string;
                  startTime: string;
                  rematchingRate: number;
                };
                Image: { src: string };
                Liker: Array<{ id: number }>;
              }) => {
                const imageSrc = user?.Image?.src;
                const cardImageSrc = imageSrc || '';
                const percent = user.rematchCount
                  ? useRematchRate(user.rematchCount, user.totalCount)
                  : 0;
                const isCheckedLike = !!user.Liker.find((l) => l.id === me?.id);
                return (
                  <PropfileCard
                    key={user.id}
                    userId={user.id}
                    image={cardImageSrc}
                    nickname={user.nickname}
                    percent={percent}
                    isLoading={isLoading}
                    isCheckedLike={isCheckedLike}
                    onClick={onShowMatchingModal(user.id)}
                    onLike={onLike}
                  />
                );
              }
            )}
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
