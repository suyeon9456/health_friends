import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import Button from '../../atoms/Button';
import { PropfileCard } from '../../molecules';
import { FriendsListWrapper, SearchFriendsWrapper, SearchHeader, SearchTitle } from './style';
import { ADD_LIKE_REQUEST } from '../../../../reducers/user';

const SearchFriends = ({ foldedGym,
  foldedFriends,
  setFoldedFriends,
  setFriend,
  setShowModal,
  setStateWarning }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const { me } = useSelector((state) => state.user);

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
    dispatch({
      type: ADD_LIKE_REQUEST,
      data: user.id,
    });
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
            gym?.Users.map((user) => {
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

SearchFriends.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  foldedFriends: PropTypes.bool.isRequired,
  setFoldedFriends: PropTypes.func.isRequired,
  setFriend: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setStateWarning: PropTypes.func.isRequired,
};

export default SearchFriends;
