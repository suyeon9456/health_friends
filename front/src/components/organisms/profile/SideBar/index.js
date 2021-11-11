import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CommentOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';

import useRate from '../../../../hooks/useRate';
import { Avatar, Upload } from '../../../atoms';
import Progress from '../../../molecules/Progress';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, SideBarWrapper, SideMenu, SideMenuWrapper } from './style';

const SideBar = ({ profileMenu, setProfileMenu }) => {
  const { profile, me } = useSelector((state) => state.user);
  const [responseRate,
    onChangeResponseRate] = useRate({
    total: profile?.Friend?.length || 0,
    number: profile?.Friend?.filter((f) => f.isPermitted).length || 0,
  });

  const onClickMenu = useCallback((e) => {
    setProfileMenu(e.target.id);
  }, [profileMenu]);

  useEffect(() => {
    onChangeResponseRate();
  }, [profile]);

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id
          ? (
            <form encType="multipart/form-data">
              <Upload src={me?.profileImage?.src} id={me?.profileImage?.id} />
            </form>
          )
          : <Avatar size={128} />}
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
          <Progress label="응답률" percent={responseRate} />
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
