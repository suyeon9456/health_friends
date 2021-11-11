import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { CommentOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';

import useRate from '../../../../hooks/useRate';
import { Avatar, Upload } from '../../../atoms';
import Progress from '../../../molecules/Progress';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, SideBarWrapper, SideMenu, SideMenuWrapper } from './style';

const SideBar = ({ profileMenu, setProfileMenu }) => {
  const { profile, me } = useSelector((state) => state.user);
  const [totalMatching, setTotalMatching] = useState(0);
  const [rematching, setRematching] = useState(0);
  const [responseRate,
    onChangeResponseRate] = useRate({
    total: profile?.resSchedule?.length || 0,
    number: profile?.resSchedule?.filter((f) => f.isPermitted).length || 0,
  });

  const [rematchingRate,
    onChangeRematchingRate] = useRate({
    total: totalMatching,
    number: rematching,
  });

  const onClickMenu = useCallback((e) => {
    setProfileMenu(e.target.id);
  }, [profileMenu]);

  useEffect(async () => {
    if (profile) {
      onChangeResponseRate();
      const { reqSchedule, resSchedule } = profile;
      const schedules = _.concat(reqSchedule, resSchedule);
      const matchings = schedules.filter(({ permission }) => permission);
      setTotalMatching(matchings.length);
      const groupByTotalMatching = _.groupBy(matchings, 'FriendId');
      let rematchingLength = 0;
      await _.forIn(groupByTotalMatching,
        (value) => {
          if (value.length >= 2) {
            rematchingLength += (value.length - 1);
          }
        });
      setRematching(rematchingLength);
    }
  }, [profile]);

  useEffect(() => {
    onChangeRematchingRate();
  }, [rematching]);

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
          <Progress label="재매칭률" percent={rematchingRate} />
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
