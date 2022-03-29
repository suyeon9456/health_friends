import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

import { Icon } from '@/components/atoms';
import {
  IconWrap,
  FooterWrap,
  FooterContent,
  LogoWrap,
  InfoWrap,
  BlogWrap,
  FooterContentWrap,
} from './style';

const Footer = () => (
  <FooterWrap>
    <FooterContentWrap>
      <FooterContent>
        <LogoWrap>
          <img
            src="https://img.health-friends.com/_next/images/sub_logo.png"
            alt="sub_logo"
          />
        </LogoWrap>
        <InfoWrap>
          <div>프로젝트 담당자: 조수연</div>
          <div>이메일: eunhye9450@gmail.com</div>
          <div>주소: 서울특별시 관악구 봉천동</div>
        </InfoWrap>
        <BlogWrap>
          <IconWrap>
            <a href="https://github.com/suyeon9456/health_friends">
              <Icon icon={<AiOutlineGithub />} />
            </a>
          </IconWrap>
          <IconWrap>
            <a href="https://sparkly-reaction-fac.notion.site/HEALTH_FRIENDS-ecaae7bdb9ad45bb894aa5fed359cc02">
              <div className="icon-back">B</div>
            </a>
          </IconWrap>
        </BlogWrap>
      </FooterContent>
    </FooterContentWrap>
  </FooterWrap>
);

export default Footer;
