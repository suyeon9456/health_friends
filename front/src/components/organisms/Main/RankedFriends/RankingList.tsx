import React, { useMemo } from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { loadRankingAPI } from '@/api/user';
import { MatchingAPI, RematchingAPI } from '@/../@types/schedule';

import {
  RankItem,
  RankTitle,
  RankCard,
  RankCardList,
  RankCardWrap,
  RankItemWrap,
} from './style';
import LoadingFallback from './LoadingFallback';

const RankingList = () => {
  const { isLoading, data: ranking } = useQuery<
    { rematching: RematchingAPI[]; matching: MatchingAPI[] } | undefined,
    AxiosError
  >(['ranking'], () => loadRankingAPI(), {
    staleTime: 2 * 60 * 1000,
  });
  return (
    <RankCardList>
      <RankCardWrap>
        <RankTitle>재매칭 순위 TOP 5</RankTitle>
        <RankCard>
          {!isLoading ? (
            Array.from({ length: 5 }, (_, i) => i).map((_, i) => {
              const user = ranking?.rematching[i];
              const profileUrl = ['/profile/', user?.id ?? ''].join('');
              return (
                <Link href={profileUrl} key={user?.id ?? i}>
                  <RankItemWrap key={user?.id ?? i}>
                    <RankItem>
                      <span>{i + 1}.</span>
                      <div>{user?.nickname ?? ''}</div>
                    </RankItem>
                  </RankItemWrap>
                </Link>
              );
            })
          ) : (
            <LoadingFallback />
          )}
        </RankCard>
      </RankCardWrap>
      <RankCardWrap>
        <RankTitle>매칭 순위 TOP 5</RankTitle>
        <RankCard>
          {!isLoading ? (
            Array.from({ length: 5 }, (_, i) => i).map((_, i) => {
              const user = ranking?.matching[i];
              const profileUrl = ['/profile/', user?.id ?? ''].join('');
              return (
                <Link href={profileUrl} key={user?.id ?? i}>
                  <RankItemWrap key={user?.id ?? i}>
                    <RankItem>
                      <span>{i + 1}.</span>
                      <div>{user?.nickname ?? ''}</div>
                    </RankItem>
                  </RankItemWrap>
                </Link>
              );
            })
          ) : (
            <LoadingFallback />
          )}
        </RankCard>
      </RankCardWrap>
    </RankCardList>
  );
};

export default RankingList;
