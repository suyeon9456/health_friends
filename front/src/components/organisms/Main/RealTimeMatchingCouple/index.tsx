import React, { Suspense, useEffect } from 'react';
import { BiGroup } from 'react-icons/bi';
import { QueryErrorResetBoundary } from 'react-query';
import { unstable_useRefreshRoot as useRefreshRoot } from 'next/streaming';
import dynamic from 'next/dynamic';
import Spinner from '@/components/atoms/Spinner';
import { Icon } from '../../../atoms';
import {
  CoupleHeaderTitle,
  MatchingCoupleBody,
  MatchingCoupleHeader,
  MatchingCoupleWrap,
} from './style';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorFallback from '../../ErrorFallback';

const MatchingList = dynamic(() => import('./MatchingList'));

const RealTimeMatchingCouple = () => {
  const test = useRefreshRoot();
  useEffect(() => {
    setTimeout(() => {
      console.log('시간지남');
      test();
    }, 3000);
  }, []);
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
            <ErrorBoundary
              onReset={reset}
              fallback={ErrorFallback}
              message="실시간 운동중인 매칭 커플을 로드하는데 실패 하였습니다."
            >
              <Suspense fallback={<Spinner />}>
                <MatchingList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
