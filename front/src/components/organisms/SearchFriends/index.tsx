import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

import { addLikeRequest, userSelector } from '@/../reducers/user';
import { gymSelector } from '@/../reducers/gym';
import { PropfileCard } from '../../molecules';
import Button from '../../atoms/Button';
import { FriendsListWrapper, SearchFriendsWrapper, SearchHeader, SearchTitle } from './style';
import { useModalDispatch } from '@/../store/modalStore';
import { ButtonType, GlobalModal, ModalStatus } from '@/../@types/utils';
import ModalPortal from '../ModalPortal';
import ModalMatchingRequest from '../ModalMatchingRequest';

const SearchFriends = ({ foldedGym,
  foldedFriends,
  setFoldedFriends }: {
    foldedGym: boolean;
    foldedFriends: boolean;
    setFoldedFriends: Dispatch<SetStateAction<boolean>>;
  }) => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const { gym } = useSelector(gymSelector);
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

  const onShowMatchingModal = useCallback((user) => () => {
    if (!(me && me.id)) {
      contextDispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: GlobalModal.ALERT,
          statusType: ModalStatus.WARNING,
          message: '로그인이 필요한 페이지입니다.',
          block: true,
        },
      });
      return
    }
    setFriend(user);
    setShowModal(true);
  }, [me && me.id]);

  const onLike = useCallback((user) => () => {
    dispatch(addLikeRequest(user.id));
  }, []);

  return (
    <>
      <SearchFriendsWrapper
        foldedGym={foldedGym}
        foldedFriends={foldedFriends}
      >
        <SearchHeader>
          <SearchTitle>{gym.name} 친구검색 결과</SearchTitle>
          <Button
            icon={<CloseOutlined />}
            type={ButtonType.TEXT}
            onClick={onChangeFoldedFriends}
          />
        </SearchHeader>
        <FriendsListWrapper>
          {gym?.Users && (
            gym?.Users.map((user: {
              id: number;
              nickname: string;
              Userdetail: { description: string; startTime: string; rematchingRate: number };
              Image: { src: string; };
            }) => {
              const imageSrc = user?.Image?.src;
              const cardImageSrc = imageSrc || '';
              return (
                <PropfileCard
                  key={user.id}
                  image={cardImageSrc}
                  nickname={user.nickname}
                  description={user.Userdetail.description}
                  date={user.Userdetail.startTime}
                  percent={user.Userdetail.rematchingRate}
                  onClick={onShowMatchingModal(user)}
                  onLike={onLike(user)}
                />
              );
            })
          )}
        </FriendsListWrapper>
      </SearchFriendsWrapper>
      <ModalPortal>
        {showModal && (
          <ModalMatchingRequest
            setShowModal={setShowModal}
            friend={friend}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default SearchFriends;
