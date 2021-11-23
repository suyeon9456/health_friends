import React from 'react';
import MainBanner from './MainBanner';
import RecommendFriends from './RecommendFriends';

import { MainBannerWrap, MainBodyWrap, MainWrap, RecommendFriendsWrap } from './style';

const Main = () => (
  <MainWrap>
    <MainBannerWrap>
      <MainBanner />
    </MainBannerWrap>
    <MainBodyWrap>
      {/* <RecommendFriendsWrap>
        <RecommendFriends />
      </RecommendFriendsWrap> */}
    </MainBodyWrap>
  </MainWrap>
);

export default Main;
