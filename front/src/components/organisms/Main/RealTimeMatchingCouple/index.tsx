import React from 'react';
import { BiGroup } from 'react-icons/bi';
import { QueryErrorResetBoundary } from 'react-query';
import { Icon } from '../../../atoms';
import {
  CoupleCardList,
  CoupleHeaderTitle,
  MatchingCoupleBody,
  MatchingCoupleHeader,
  MatchingCoupleWrap,
} from './style';
import ErrorBoundary from '../../ErrorBoundary';
import Fallback from '../RecommendFriends/Fallback';
import MathcingList from './MatchingList';

const RealTimeMatchingCouple = () => {
  return (
    <MatchingCoupleWrap>
      <MatchingCoupleHeader>
        <CoupleHeaderTitle>
          <Icon icon={<BiGroup />} /> 실시간 운동중인 매칭커플
        </CoupleHeaderTitle>
      </MatchingCoupleHeader>
      <MatchingCoupleBody>
        <QueryErrorResetBoundary>
          {({ reset }) => {
            console.log(ErrorBoundary);
            return (
              <ErrorBoundary
                onReset={reset}
                fallback={Fallback}
                message="실시간 운동중인 매칭 커플을 로드하는데 실패 하였습니다."
              >
                <MathcingList />
              </ErrorBoundary>
            );
          }}
        </QueryErrorResetBoundary>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
