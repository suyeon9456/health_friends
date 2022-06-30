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
import { QueryErrorResetBoundary } from 'react-query';
import ModalPortal from '../ModalPortal';
import ModalMatchingRequest from '../ModalMatchingRequest';
import {
  FriendsListWrapper,
  SearchFriendsWrapper,
  SearchHeader,
  SearchTitle,
} from './style';
import FriendsList from './FriendsList';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';

const SearchFriends = () => {
  const dispatch = useDispatch();
  const { isFoldedFriends, isFoldedGym } = useSelector(foldedItemSelector);
  const { selectedGym } = useSelector(gymSelector);

  const [friend, setFriend] = useState<UserGym>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChangeFoldedFriends = useCallback(() => {
    dispatch(changeIsFoldedFriends(!isFoldedFriends));
  }, [isFoldedFriends]);

  return (
    <SearchFriendsWrapper
      foldedGym={isFoldedGym}
      foldedFriends={isFoldedFriends}
    >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            key={selectedGym}
            onReset={reset}
            fallback={ErrorFallback}
            message="헬스장일 이용중인 사용자를 로드하는데 실패 하였습니다."
          >
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
                <ModalMatchingRequest
                  setShowModal={setShowModal}
                  friend={friend}
                />
              )}
            </ModalPortal>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </SearchFriendsWrapper>
  );
};

export default React.memo(SearchFriends);
