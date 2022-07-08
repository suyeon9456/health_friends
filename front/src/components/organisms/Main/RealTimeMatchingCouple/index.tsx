import React from 'react';
import { BiGroup } from 'react-icons/bi';
import { QueryErrorResetBoundary } from 'react-query';
import dynamic from 'next/dynamic';
import { Icon } from '../../../atoms';
import {
  CoupleHeaderTitle,
  MatchingCoupleBody,
  MatchingCoupleHeader,
  MatchingCoupleWrap,
} from './style';
import SuspenseWithErrorBoundary from '../../SuspenseWithErrorBoundary';
import LoadingFallback from './LoadingFallback';

const MatchingList = dynamic(() => import('./MatchingList'));

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
          {({ reset }) => (
            <SuspenseWithErrorBoundary
              onReset={reset}
              errorMessgae="실시간 운동중인 매칭 커플을 로드하는데 실패 하였습니다."
              loadingfallback={<LoadingFallback />}
            >
              <MatchingList />
            </SuspenseWithErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
