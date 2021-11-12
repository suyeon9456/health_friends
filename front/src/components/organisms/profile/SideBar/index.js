import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { CommentOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';

import useRate from '../../../../hooks/useRate';
import { Avatar, Upload } from '../../../atoms';
import Progress from '../../../molecules/Progress';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, SideBarWrapper, SideMenu, SideMenuWrapper } from './style';
import { ADD_PROFILEIMAGE_REQUEST, REMOVE_PROFILEIMAGE, UPLOAD_PROFILEIMAGE_REQUEST } from '../../../../../reducers/user';

const SideBar = ({ profileMenu, setProfileMenu }) => {
  const dispatch = useDispatch();
  const { profile, me, imagePath, uploadProfileImageError } = useSelector((state) => state.user);
  const [totalMatching, setTotalMatching] = useState(0);
  const [rematching, setRematching] = useState(0);
  const [uploadState, setUploadState] = useState(false);
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

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_PROFILEIMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onChangeUploadState = useCallback(() => {
    setUploadState((prev) => !prev);
  }, [uploadState]);

  const onAddProfileImage = useCallback(() => {
    dispatch({
      type: ADD_PROFILEIMAGE_REQUEST,
      data: { image: imagePath },
    });
    onChangeUploadState();
  }, [imagePath]);

  const onRemoveUploadImage = useCallback(() => {
    dispatch({
      type: REMOVE_PROFILEIMAGE,
    });
  }, []);

  useEffect(() => {
    onChangeRematchingRate();
  }, [rematching]);

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id && uploadState
          ? (
            <>
              <form encType="multipart/form-data">
                <Upload
                  id={imagePath}
                  name="image"
                  src={`http://localhost:6015/${imagePath}`}
                  onChange={onChangeImage}
                  uploadError={uploadProfileImageError}
                  onAddImage={onAddProfileImage}
                  onRemove={onRemoveUploadImage}
                />
              </form>
              <div>
                <a onClick={onChangeUploadState}>취소</a>
              </div>
            </>
          )
          : (
            <>
              <Avatar size={128} src={me?.Image ? `http://localhost:6015/${me?.Image?.src}` : ''} />
              {me?.id && (
                <div>
                  <a onClick={onChangeUploadState}>프로필 사진 변경하기</a>
                </div>
              )}
            </>
          )}
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
