import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';

import ProfileCard from '../../molecules/PropfileCard';
import { FriendsListWrapper, SearchFriendsWrapper, SearchHeader, SearchTitle } from './style';
import Button from '../../atoms/Button';

const SearchFriends = ({ foldedGym, changeShowModal }) => {
  const [foldedFriends, setFoldedFriends] = useState(false);

  const changeFoldedFriends = useCallback(() => {
    setFoldedFriends((prev) => !prev);
  }, [foldedFriends]);

  const actions = [
    { icon: <UserAddOutlined />, key: 'rematch' },
    { icon: <EditOutlined />, key: 'edit' },
  ];

  return (
    <SearchFriendsWrapper
      foldedGym={foldedGym}
      foldedFriends={foldedFriends}
    >
      <SearchHeader>
        <SearchTitle>...헬스장 친구 결과</SearchTitle>
        <Button
          icon={<CloseOutlined />}
          type="text"
          onClick={changeFoldedFriends}
        />
      </SearchHeader>
      <FriendsListWrapper>
        <ProfileCard
          nickname="nickname"
          description="간단소개..."
          date="2020.00.00 10:56 AM"
          image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          percent={30}
          actions={actions}
          onClick={changeShowModal}
        />
      </FriendsListWrapper>
    </SearchFriendsWrapper>
  );
};

SearchFriends.propTypes = {
  foldedGym: PropTypes.func.isRequired,
  changeShowModal: PropTypes.func.isRequired,
};

export default SearchFriends;
