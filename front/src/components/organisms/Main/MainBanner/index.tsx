import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiSearchAlt } from 'react-icons/bi';

import { ButtonType, SizeType } from '@/../@types/constant';
import { QueryErrorResetBoundary } from 'react-query';
import RecommendFriends from '../RecommendFriends';
import { Button, Icon } from '../../../atoms';
import {
  BannerWrap,
  BannerImageWrap,
  BannerContent,
  BannerContentWrap,
  BannerHeader,
  BannerHeaderTitle,
  BannerImageBack,
  BannerImage,
} from './style';
import ErrorFallback from '../../ErrorFallback';
import ErrorBoundary from '../../ErrorBoundary';

const MainBanner = () => (
  <BannerWrap>
    <BannerImageBack />
    <BannerImageWrap>
      <BannerImage>
        <Image
          src="https://img.health-friends.com/_next/images/banner.jpg"
          layout="fill"
          priority
        />
      </BannerImage>
    </BannerImageWrap>
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
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallback={ErrorFallback}
              message="위치에서 운동하는 추천친구를 로드하는데 실패 하였습니다."
            >
              <RecommendFriends />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BannerContent>
    </BannerContentWrap>
  </BannerWrap>
);

export default MainBanner;
