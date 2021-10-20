import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CommentOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';

import Avatar from '../../../atoms/Avatar';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, SideBarWrapper, SideMenu, SideMenuWrapper } from './style';
import Progress from '../../../molecules/Progress';

const SideBar = () => {
  const { profile } = useSelector((state) => state.user);
  return (
    <SideBarWrapper>
      <AvatarWrapper>
        <Avatar size={128} />
      </AvatarWrapper>
      <InfoWrapper>
        <InfoContent key="matching">
          <InfoIconWrapper>
            <TrophyOutlined />
          </InfoIconWrapper>
          <Progress label="재매칭률" percent={70} />
        </InfoContent>
        <InfoContent key="response">
          <InfoIconWrapper>
            <CommentOutlined />
          </InfoIconWrapper>
          <Progress label="응답률" percent={90} />
        </InfoContent>
        <InfoContent key="address">
          <InfoIconWrapper>
            <HomeOutlined />
          </InfoIconWrapper>
          <div>
            <span>이용중인 헬스장: </span>
            {profile?.Gyms.map((gym) => (
              <div>{gym.address} <a>{gym.name}</a></div>
            ))}
          </div>
        </InfoContent>
      </InfoWrapper>
      <SideMenuWrapper>
        <SideMenu key="matching-date">
          <Link href="/">
            <a>매칭일정</a>
          </Link>
        </SideMenu>
        <SideMenu key="matching-record">
          <Link href="/">
            <a>매칭기록</a>
          </Link>
        </SideMenu>
        <SideMenu key="liked-friends">
          <Link href="/">
            <a>좋아요한 친구</a>
          </Link>
        </SideMenu>
      </SideMenuWrapper>
    </SideBarWrapper>
  );
};

export default SideBar;
