import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import { loadRankedFriendsRequest, mainSelector } from '@/../reducers/user';
import { RankItem, RankTitle, RankCard, RankCardList, RankCardWrap, RankedFriendsBody, RankedFriendsHeader, RankedFriendsWrap, RankItemWrap, NoDataCard, NoDataContent, NoDataIconWrap, NoDataText } from './style';
import NoDataIcon from '../../../atoms/NoDataIcon';

interface Matching {
  count: number,
  id: number
  nickname: string,
  reqSchedule: Array<{ id: number }>,
}

interface ReMatching {
  count: number,
  id: number
  nickname: string,
  reqSchedule: Array<{ id: number }>,
}

const RankedFriends = () => {
  const dispatch = useDispatch();
  const { rankedFriends } = useSelector(mainSelector);
  useEffect(() => {
    dispatch(loadRankedFriendsRequest());
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
              {!_.isEmpty(rankedFriends?.rematching)
                ? rankedFriends?.rematching?.map((friend: Matching, index: number) => {
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
                })
                : (
                  <NoDataCard>
                    <NoDataContent>
                      <NoDataIconWrap>
                        <NoDataIcon width={62} height={62} color="#00000040" />
                      </NoDataIconWrap>
                      <NoDataText>
                        <span>랭킹이 없습니다.</span>
                      </NoDataText>
                    </NoDataContent>
                  </NoDataCard>
                )}
            </RankCard>
          </RankCardWrap>
          <RankCardWrap>
            <RankTitle>
              매칭 순위 TOP 5
            </RankTitle>
            <RankCard>
              {!_.isEmpty(rankedFriends?.matching)
                ? rankedFriends?.matching?.map((friend: ReMatching, index: number) => {
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
                })
                : (
                  <NoDataCard>
                    <NoDataContent>
                      <NoDataIconWrap>
                        <NoDataIcon width={62} height={62} color="#00000040" />
                      </NoDataIconWrap>
                      <NoDataText>
                        <span>랭킹이 없습니다.</span>
                      </NoDataText>
                    </NoDataContent>
                  </NoDataCard>
                )}
            </RankCard>
          </RankCardWrap>
        </RankCardList>
      </RankedFriendsBody>
    </RankedFriendsWrap>
  );
};

export default RankedFriends;
