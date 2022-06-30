import { Menu, ProfileMenuType } from '@/../@types/constant';
import { tabSelector } from '@/../reducers/profile';
import React from 'react';
import { QueryErrorResetBoundary } from 'react-query';
import { useSelector } from 'react-redux';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
import Info from './Info';
import LikedList from './LikedList';
import MatchingCalendar from './MatchingCalendar';
import MatchingRecord from './MatchingRecord';
import MoreInfo from './MoreInfo';

const ProfileContents = () => {
  const { tab }: { tab: ProfileMenuType } = useSelector(tabSelector);
  return (
    <QueryErrorResetBoundary>
      {({ reset }) =>
        ({
          [Menu.LIKED]: (
            <ErrorBoundary
              onReset={reset}
              fallback={ErrorFallback}
              message="관심친구를 로드하는데 실패 하였습니다."
            >
              <LikedList />
            </ErrorBoundary>
          ),
          [Menu.CALENDAR]: (
            <ErrorBoundary
              onReset={reset}
              fallback={ErrorFallback}
              message="매칭일정을 로드하는데 실패 하였습니다."
            >
              <MatchingCalendar />
            </ErrorBoundary>
          ),
          [Menu.RECORD]: (
            <ErrorBoundary
              onReset={reset}
              fallback={ErrorFallback}
              message="매칭기록을 로드하는데 실패 하였습니다."
            >
              <MatchingRecord />
            </ErrorBoundary>
          ),
          [Menu.INFO]: (
            <div>
              <Info />
              <MoreInfo />
            </div>
          ),
        }[tab])
      }
    </QueryErrorResetBoundary>
  );
};

export default ProfileContents;
