import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';

import { Button } from '../../../atoms';
import RecommendFriends from '../RecommendFriends';
import { BannerWrap, BannerImage, BannerContent, BannerContentWrap, BannerHeader, BannerHeaderTitle, BannerImageWrap } from './style';

const MainBanner = ({ location }) => (
  <BannerWrap>
    <BannerImageWrap />
    <BannerImage />
    <BannerHeader>
      <Button
        type="primary"
        size="large"
        icon={<SearchOutlined />}
      >
        친구찾으러 가기
      </Button>
      <BannerHeaderTitle>
        <span className="project-name">HEALTH FRIENDS</span> 에서<br />운동같이 할 친구찾기
      </BannerHeaderTitle>
    </BannerHeader>
    <BannerContentWrap>
      <BannerContent>
        <RecommendFriends location={location} />
      </BannerContent>
    </BannerContentWrap>
  </BannerWrap>
);

MainBanner.propTypes = {
  location: PropTypes.node,
};

export default MainBanner;
