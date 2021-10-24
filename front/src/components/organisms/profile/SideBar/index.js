import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CommentOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';

import Avatar from '../../../atoms/Avatar';
import Progress from '../../../molecules/Progress';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, SideBarWrapper, SideMenu, SideMenuWrapper } from './style';

const SideBar = ({ profileMenu, setProfileMenu }) => {
  const { profile } = useSelector((state) => state.user);

  const onClickMenu = useCallback((e) => {
    console.log(e.target.id);
    setProfileMenu(e.target.id);
  }, [profileMenu]);
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
              <div key={gym.id}>{gym.address} <a>{gym.name}</a></div>
            ))}
          </div>
        </InfoContent>
      </InfoWrapper>
      <SideMenuWrapper>
        <SideMenu
          key="calendar"
          id="calendar"
          onClick={onClickMenu}
        >
          매칭일정
        </SideMenu>
        <SideMenu
          key="record"
          id="record"
          onClick={onClickMenu}
        >
          매칭기록
        </SideMenu>
        <SideMenu
          key="liked-friends"
          id="liked-friends"
          onClick={onClickMenu}
        >
          좋아요한 친구
        </SideMenu>
      </SideMenuWrapper>
    </SideBarWrapper>
  );
};

SideBar.propTypes = {
  profileMenu: PropTypes.string.isRequired,
  setProfileMenu: PropTypes.func.isRequired,
};

export default SideBar;
