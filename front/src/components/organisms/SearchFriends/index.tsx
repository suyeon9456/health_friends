import React, { useCallback, useState } from 'react';
import { BiX } from 'react-icons/bi';

import { ButtonType } from '@/../@types/constant';
import { UserGym } from '@/../@types/user';
import { Icon, Button } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeIsFoldedFriends,
  foldedItemSelector,
  gymSelector,
} from '@/../reducers/gym';
import ModalPortal from '../ModalPortal';
import ModalMatchingRequest from '../ModalMatchingRequest';
import { FriendsListWrapper, SearchHeader, SearchTitle } from './style';
import FriendsList from './FriendsList';

const SearchFriends = () => {
  const dispatch = useDispatch();
  const { isFoldedFriends } = useSelector(foldedItemSelector);
  const { selectedGym } = useSelector(gymSelector);

  const [friend, setFriend] = useState<UserGym>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChangeFoldedFriends = useCallback(() => {
    dispatch(changeIsFoldedFriends(!isFoldedFriends));
  }, [isFoldedFriends]);

  return (
    <>
      <SearchHeader>
        <SearchTitle>{selectedGym?.name} 친구검색 결과</SearchTitle>
        <Button
          icon={<Icon icon={<BiX />} />}
          type={ButtonType.TEXT}
          onClick={onChangeFoldedFriends}
        />
      </SearchHeader>
      <FriendsListWrapper>
        <FriendsList setFriend={setFriend} setShowModal={setShowModal} />
      </FriendsListWrapper>
      <ModalPortal>
        {showModal && (
          <ModalMatchingRequest setShowModal={setShowModal} friend={friend} />
        )}
      </ModalPortal>
    </>
  );
};

export default SearchFriends;
