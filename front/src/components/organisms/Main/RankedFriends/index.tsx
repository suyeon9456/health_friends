import React from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';

import { Matching } from '@/../@types/schedule';
import { Rematching } from '@/../@types/fetchData';
import { loadRankedFriendsAPI } from '@/api/user';
import {
  RankItem,
  RankTitle,
  RankCard,
  RankCardList,
  RankCardWrap,
  RankedFriendsBody,
  RankedFriendsHeader,
  RankedFriendsWrap,
  RankItemWrap,
  LoadingRankItem,
  LoadingRankWrap,
} from './style';

const RankedFriends = () => {
  const {
    isLoading,
    error,
    data: rankedFriends,
  } = useQuery<
    { rematching: Rematching[]; matching: Matching[] } | undefined,
    AxiosError
  >('rankedFriends', () => loadRankedFriendsAPI(), {
    cacheTime: 2 * 60 * 1000,
  });

  return (
    <RankedFriendsWrap>
      <RankedFriendsHeader>HEALTH FRIENDS 인기 사용자</RankedFriendsHeader>
      <RankedFriendsBody>
        <RankCardList>
          <RankCardWrap>
            <RankTitle>재매칭 순위 TOP 5</RankTitle>
            <RankCard>
              {!isEmpty(rankedFriends?.rematching) && !error && !isLoading
                ? rankedFriends?.rematching?.map((friend, index: number) => {
                    const friendId = friend.id;
                    const profileUrl = ['/profile/', friendId].join('');
                    return (
                      <Link href={profileUrl} key={friend.id}>
                        <RankItemWrap>
                          <RankItem>
                            <span>{index + 1}.</span>
                            <div>{friend ? friend.nickname : '없음'}</div>
                          </RankItem>
                        </RankItemWrap>
                      </Link>
                    );
                  })
                : Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <LoadingRankWrap key={i}>
                      <LoadingRankItem>
                        <span />
                        <div />
                      </LoadingRankItem>
                    </LoadingRankWrap>
                  ))}
            </RankCard>
          </RankCardWrap>
          <RankCardWrap>
            <RankTitle>매칭 순위 TOP 5</RankTitle>
            <RankCard>
              {!isEmpty(rankedFriends?.matching) && !error && !isLoading
                ? rankedFriends?.matching?.map(
                    (friend: Matching, index: number) => {
                      const friendId = friend.id;
                      const profileUrl = ['/profile/', friendId].join('');
                      return (
                        <Link href={profileUrl} key={friend.id}>
                          <RankItemWrap key={friend.id}>
                            <RankItem>
                              <span>{index + 1}.</span>
                              <div>{friend ? friend.nickname : '없음'}</div>
                            </RankItem>
                          </RankItemWrap>
                        </Link>
                      );
                    }
                  )
                : Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <LoadingRankWrap key={`${i}rank`}>
                      <LoadingRankItem>
                        <span />
                        <div />
                      </LoadingRankItem>
                    </LoadingRankWrap>
                  ))}
            </RankCard>
          </RankCardWrap>
        </RankCardList>
      </RankedFriendsBody>
    </RankedFriendsWrap>
  );
};

export default RankedFriends;
