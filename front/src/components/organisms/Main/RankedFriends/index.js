import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_RANKED_FRIENDS_REQUEST } from '../../../../../reducers/user';

import { RankItem, RankTitle, RankCard, RankCardList, RankCardWrap, RankedFriendsBody, RankedFriendsHeader, RankedFriendsWrap, RankItemWrap } from './style';

const RankedFriends = () => {
  const dispatch = useDispatch();
  const { rankedFriends } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_RANKED_FRIENDS_REQUEST,
    });
  }, []);

  return (
    <RankedFriendsWrap>
      <RankedFriendsHeader>
        HEALTH FRIENDS 인기 사용자
      </RankedFriendsHeader>
      <RankedFriendsBody>
        <RankCardList>
          <RankCardWrap>
            <RankTitle>
              재매칭 순위 TOP 5
            </RankTitle>
            <RankCard>
              {rankedFriends?.rematching?.map((friend, index) => {
                const friendId = friend.id;
                const profileUrl = ['/profile/', friendId].join('');
                return (
                  <RankItemWrap key={friend.id}>
                    <RankItem>
                      <span>{index + 1}.</span>
                      {friend
                        ? (
                          <Link href={profileUrl}>
                            <a>{friend.nickname}</a>
                          </Link>
                        )
                        : <div>없음</div>}
                    </RankItem>
                  </RankItemWrap>
                );
              })}
            </RankCard>
          </RankCardWrap>
          <RankCardWrap>
            <RankTitle>
              매칭 순위 TOP 5
            </RankTitle>
            <RankCard>
              {rankedFriends?.matching?.map((friend, index) => {
                const friendId = friend.id;
                const profileUrl = ['/profile/', friendId].join('');
                return (
                  <RankItemWrap key={friend.id}>
                    <RankItem>
                      <span>{index + 1}.</span>
                      {friend
                        ? (
                          <Link href={profileUrl}>
                            <a>{friend.nickname}</a>
                          </Link>
                        )
                        : <div>없음</div>}
                    </RankItem>
                  </RankItemWrap>
                );
              })}
            </RankCard>
          </RankCardWrap>
        </RankCardList>
      </RankedFriendsBody>
    </RankedFriendsWrap>
  );
};

export default RankedFriends;
