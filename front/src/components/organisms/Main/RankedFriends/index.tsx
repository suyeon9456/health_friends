import React from 'react';

import { QueryErrorResetBoundary } from 'react-query';
// import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/atoms';
import {
  RankedFriendsBody,
  RankedFriendsHeader,
  RankedFriendsWrap,
} from './style';
import ErrorBoundary from '../../ErrorBoundary';
import RankingList from './RankingList';
import Fallback from '../RecommendFriends/Fallback';

const RankedFriends = () => {
  return (
    <RankedFriendsWrap>
      <RankedFriendsHeader>HEALTH FRIENDS 인기 사용자</RankedFriendsHeader>
      <RankedFriendsBody>
        <QueryErrorResetBoundary>
          {({ reset }) => {
            console.log(ErrorBoundary);
            return (
              <ErrorBoundary
                onReset={reset}
                fallback={Fallback}
                message="인기 사용자를 로드하는데 실패 하였습니다."
              >
                <RankingList />
              </ErrorBoundary>
            );
          }}
        </QueryErrorResetBoundary>
      </RankedFriendsBody>
    </RankedFriendsWrap>
  );
};

export default RankedFriends;
