import React from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';

import { loadRankingAPI } from '@/api/user';
import { MatchingAPI, RematchingAPI } from '@/../@types/schedule';
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
    data: ranking,
  } = useQuery<
    { rematching: RematchingAPI[]; matching: MatchingAPI[] } | undefined,
    AxiosError
  >(['ranking'], () => loadRankingAPI(), {
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return (
    <RankedFriendsWrap>
      <RankedFriendsHeader>HEALTH FRIENDS 인기 사용자</RankedFriendsHeader>
      <RankedFriendsBody>
        <RankCardList>
          <RankCardWrap>
            <RankTitle>재매칭 순위 TOP 5</RankTitle>
            <RankCard>
              {!isEmpty(ranking?.rematching) && !error && !isLoading
                ? Array.from({ length: 5 }, (_, i) => i).map((_, i) => {
                    const user = ranking?.rematching[i];
                    const profileUrl = ['/profile/', user?.id ?? ''].join('');
                    return (
                      <Link href={profileUrl} key={user?.id ?? i}>
                        <RankItemWrap key={user?.id ?? i}>
                          <RankItem>
                            <span>{i + 1}.</span>
                            <div>{user?.nickname ?? '없음'}</div>
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
              {!isEmpty(ranking?.matching) && !error && !isLoading
                ? Array.from({ length: 5 }, (_, i) => i).map((_, i) => {
                    const user = ranking?.matching[i];
                    const profileUrl = ['/profile/', user?.id ?? ''].join('');
                    return (
                      <Link href={profileUrl} key={user?.id ?? i}>
                        <RankItemWrap key={user?.id ?? i}>
                          <RankItem>
                            <span>{i + 1}.</span>
                            <div>{user?.nickname ?? '없음'}</div>
                          </RankItem>
                        </RankItemWrap>
                      </Link>
                    );
                  })
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
