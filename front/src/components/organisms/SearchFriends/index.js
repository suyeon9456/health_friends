import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import Button from '../../atoms/Button';
import { PropfileCard } from '../../molecules';
import { FriendsListWrapper, SearchFriendsWrapper, SearchHeader, SearchTitle } from './style';

const SearchFriends = ({ foldedGym,
  foldedFriends,
  setFoldedFriends,
  setFriend,
  setShowModal,
  setStateWarning }) => {
  // const actions = [
  //   { icon: <UserAddOutlined />, key: 'rematch' },
  //   { icon: <EditOutlined />, key: 'edit' },
  // ];

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
            gym?.Users.map((user) => (
              <PropfileCard
                key={user.id}
                nickname={user.nickname}
                description={user.Userdetail.description}
                date={user.Userdetail.startTime}
                percent={30}
                onClick={onShowMatchingModal(user)}
                // actions={actions}
              />
            ))
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
