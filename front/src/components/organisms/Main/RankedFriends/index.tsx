import React from 'react';

import { QueryErrorResetBoundary } from 'react-query';
import {
  RankedFriendsBody,
  RankedFriendsHeader,
  RankedFriendsWrap,
} from './style';
import ErrorBoundary from '../../ErrorBoundary';
import RankingList from './RankingList';
import ErrorFallback from '../../ErrorFallback';

const RankedFriends = () => (
  <RankedFriendsWrap>
    <RankedFriendsHeader>HEALTH FRIENDS 인기 사용자</RankedFriendsHeader>
    <RankedFriendsBody>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallback={ErrorFallback}
            message="인기 사용자를 로드하는데 실패 하였습니다."
          >
            <RankingList />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </RankedFriendsBody>
  </RankedFriendsWrap>
);

export default RankedFriends;
