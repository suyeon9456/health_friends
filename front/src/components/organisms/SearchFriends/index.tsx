import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

import { addLikeRequest, userSelector } from '@/../reducers/user';
import { gymSelector } from '@/../reducers/gym';
import { PropfileCard } from '../../molecules';
import Button from '../../atoms/Button';
import { FriendsListWrapper, SearchFriendsWrapper, SearchHeader, SearchTitle } from './style';

const SearchFriends = ({ foldedGym,
  foldedFriends,
  setFoldedFriends,
  setFriend,
  setShowModal,
  setStateWarning }: {
    foldedGym: boolean;
    foldedFriends: boolean;
    setFoldedFriends: Dispatch<SetStateAction<boolean>>;
    setFriend: Dispatch<SetStateAction<{
      id?: number;
      nickname?: string;
      Userdetail?: object;
      Image?: object;
      UserGym?: { GymId?: number };
     }>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setStateWarning: Dispatch<SetStateAction<boolean>>;
  }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector(gymSelector);
  const { me } = useSelector(userSelector);

  const onChangeFoldedFriends = useCallback(() => {
    setFoldedFriends((prev) => !prev);
  }, [foldedFriends]);

  const onShowMatchingModal = useCallback((user) => () => {
    if (!(me && me.id)) {
      return setStateWarning(true);
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
            type="text"
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
    </>
  );
};

export default SearchFriends;
