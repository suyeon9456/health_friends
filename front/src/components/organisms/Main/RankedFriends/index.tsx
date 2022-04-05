import React from 'react';
import Link from 'next/link';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import groupBy from 'lodash/groupBy';
import forIn from 'lodash/forIn';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';

import { Matching } from '@/../@types/schedule';
import { FetchRankedFriends, Rematching } from '@/../@types/fetchData';
import { NoDataIcon } from '@/components/atoms';
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
  >(
    'rankedFriends',
    async () => {
      const { data }: AxiosResponse<FetchRankedFriends> = await axios.get(
        '/users/rankedFriends'
      );
      const idGroup = groupBy(data.matching, 'id');
      const matching: Matching[] = [];
      forIn(idGroup, (value) => {
        if (value.length > 1) {
          const req = {
            ...value[0],
            count: value[0].reqSchedule.length + value[1].resSchedule.length,
          };
          return matching.push(req);
        }
        return matching.push({
          ...value[0],
          count:
            value[0].reqSchedule?.length ||
            0 + value[0].resSchedule?.length ||
            0,
        });
      });
      return {
        rematching: data.rematching,
        matching: orderBy(matching, ['count'], ['desc']),
      };
    },
    { cacheTime: 2 * 60 * 1000 }
  );

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
