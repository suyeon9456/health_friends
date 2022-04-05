import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiX } from 'react-icons/bi';

import { addLikeRequest, userSelector } from '@/../reducers/user';
import { gymSelector } from '@/../reducers/gym';
import { useModalDispatch } from '@/../store/modalStore';
import { ButtonType, GlobalModal, ModalStatus } from '@/../@types/utils';
import { Icon } from '@/components/atoms';
import useRematchRate from '@/hooks/useRematchRate';
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
  foldedGym,
  foldedFriends,
  setFoldedFriends,
}: {
  foldedGym: boolean;
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const { loadFriendsLoading, gym } = useSelector(gymSelector);
  const { me } = useSelector(userSelector);

  const [friend, setFriend] = useState<{
    id?: number;
    nickname?: string;
    Userdetail?: object;
    Image?: object;
    UserGym?: { GymId?: number };
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);

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
    (user) => () => {
      dispatch(addLikeRequest(user.id));
    },
    []
  );

  return (
    <>
      <SearchFriendsWrapper foldedGym={foldedGym} foldedFriends={foldedFriends}>
        <SearchHeader>
          <SearchTitle>{gym.name} 친구검색 결과</SearchTitle>
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
              }) => {
                const imageSrc = user?.Image?.src;
                const cardImageSrc = imageSrc || '';
                const percent = user.rematchCount
                  ? useRematchRate(user.rematchCount, user.totalCount)
                  : 0;
                return (
                  <PropfileCard
                    key={user.id}
                    image={cardImageSrc}
                    nickname={user.nickname}
                    percent={percent}
                    isLoading={loadFriendsLoading}
                    onClick={onShowMatchingModal(user)}
                    onLike={onLike(user)}
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
