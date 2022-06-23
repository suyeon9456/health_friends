import React from 'react';
import { QueryErrorResetBoundary } from 'react-query';
import ErrorBoundary from '../ErrorBoundary';
import MainBanner from './MainBanner';
import RankedFriends from './RankedFriends';
import RealTimeMatchingCouple from './RealTimeMatchingCouple';
import Fallback from './RecommendFriends/Fallback';

import { MainBannerWrap, MainBodyWrap, MainWrap } from './style';

const Main = () => (
  <MainWrap>
    <MainBannerWrap>
      <MainBanner />
    </MainBannerWrap>
    <MainBodyWrap>
      <RankedFriends />
      <RealTimeMatchingCouple />
    </MainBodyWrap>
  </MainWrap>
);

export default Main;
