import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { Button } from '../../../atoms';
import RecommendFriends from '../RecommendFriends';
import { BannerWrap, BannerImageWrap, BannerContent, ContentTitle, BannerContentWrap } from './style';

const MainBanner = () => (
  <BannerWrap>
    <BannerImageWrap>
      <img height={200} src="/images/banner.jpg" alt="main-banner" />
    </BannerImageWrap>
    <BannerContentWrap>
      <BannerContent>
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
        >
          친구찾으러 가기
        </Button>
        <ContentTitle>
          <span className="project-name">HEALTH FRIENDS</span> 에서<br />운동같이 할 친구찾기
        </ContentTitle>
        <RecommendFriends />
      </BannerContent>
    </BannerContentWrap>
  </BannerWrap>
);

export default MainBanner;
