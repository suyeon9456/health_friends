import React from 'react';
import Link from 'next/link';
import { BiSearchAlt } from 'react-icons/bi';

import { ButtonType, SizeType } from '@/../@types/utils';
import RecommendFriends from '../RecommendFriends';
import { Button, Icon } from '../../../atoms';
import {
  BannerWrap,
  BannerImage,
  BannerContent,
  BannerContentWrap,
  BannerHeader,
  BannerHeaderTitle,
  BannerImageWrap,
} from './style';

const MainBanner = () => (
  <BannerWrap>
    <BannerImageWrap />
    <BannerImage />
    <BannerHeader>
      <Link href="/friends" passHref>
        <a>
          <Button
            type={ButtonType.PRIMARY}
            size={SizeType.LARGE}
            icon={<Icon icon={<BiSearchAlt />} />}
          >
            {' '}
            친구찾으러 가기
          </Button>
        </a>
      </Link>
      <BannerHeaderTitle>
        <span className="project-name">HEALTH FRIENDS</span> 에서
        <br />
        운동같이 할 친구찾기
      </BannerHeaderTitle>
    </BannerHeader>
    <BannerContentWrap>
      <BannerContent>
        <RecommendFriends />
      </BannerContent>
    </BannerContentWrap>
  </BannerWrap>
);

export default MainBanner;
