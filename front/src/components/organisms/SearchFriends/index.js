import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import Button from '../../atoms/Button';
import ProfileCard from '../../molecules/PropfileCard';
import { FriendsListWrapper, SearchFriendsWrapper, SearchHeader, SearchTitle } from './style';
import ModalMatchingRequest from '../ModalMatchingRequest';

const SearchFriends = ({ foldedGym, foldedFriends, setFoldedFriends }) => {
  // const actions = [
  //   { icon: <UserAddOutlined />, key: 'rematch' },
  //   { icon: <EditOutlined />, key: 'edit' },
  // ];

  const { gym } = useSelector((state) => state.gym);
  const [showModal, setShowModal] = useState(false);
  const [friend, setFriend] = useState(false);

  const onChangeFoldedFriends = useCallback(() => {
    setFoldedFriends((prev) => !prev);
  }, [foldedFriends]);

  const onShowMatchingModal = useCallback((user) => () => {
    setFriend(user);
    setShowModal(true);
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
            gym?.Users.map((user) => (
              <ProfileCard
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
      <ModalMatchingRequest
        showModal={showModal}
        setShowModal={setShowModal}
        friend={friend}
      />
    </>
  );
};

SearchFriends.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  foldedFriends: PropTypes.bool.isRequired,
  setFoldedFriends: PropTypes.func.isRequired,
};

export default SearchFriends;
