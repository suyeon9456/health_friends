import React from 'react';
import MainBanner from './MainBanner';
import RankedFriends from './RankedFriends';
import RealTimeMatchingCouple from './RealTimeMatchingCouple';

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
