import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CommentOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';

import useRate from '../../../../hooks/useRate';
import { Avatar, Button, Upload } from '../../../atoms';
import Progress from '../../../molecules/Progress';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, SideBarWrapper, SideMenu, SideMenuWrapper } from './style';
import { ADD_PROFILEIMAGE_REQUEST, REMOVE_PROFILEIMAGE, UPLOAD_PROFILEIMAGE_REQUEST } from '../../../../../reducers/user';
import { backUrl } from '../../../../../config/config';

const SideBar = ({ profileMenu, setProfileMenu }) => {
  const dispatch = useDispatch();
  const { profile, me, imagePath, uploadProfileImageError } = useSelector((state) => state.user);
  const [uploadState, setUploadState] = useState(false);
  const [responseRate,
    onChangeResponseRate] = useRate({
    total: profile?.resSchedule?.length || 0,
    number: profile?.resSchedule?.filter((f) => f.isPermitted).length || 0,
  });

  const onClickMenu = useCallback((e) => {
    setProfileMenu(e.target.id);
  }, [profileMenu]);

  useEffect(() => {
    if (profile) {
      onChangeResponseRate();
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
                  src={`${backUrl}/${imagePath}`}
                  onChange={onChangeImage}
                  uploadError={uploadProfileImageError}
                  onAddImage={onAddProfileImage}
                  onRemove={onRemoveUploadImage}
                />
              </form>
              <div>
                {/* <a onClick={onChangeUploadState}>취소</a> */}
                <Button type="text" onClick={onChangeUploadState}>취소</Button>
              </div>
            </>
          )
          : (
            <>
              <Avatar size={128} src={profile?.Image ? `${backUrl}/${profile?.Image?.src}` : ''} />
              {me?.id && (
                <div>
                  {/* <a onClick={onChangeUploadState}>프로필 사진 변경하기</a> */}
                  <Button type="text" onClick={onChangeUploadState}>프로필 사진 변경하기</Button>
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
          <Progress label="재매칭률" percent={profile?.Userdetail?.rematchingRate} />
        </InfoContent>
        <InfoContent key="response">
          <InfoIconWrapper>
            <CommentOutlined />
          </InfoIconWrapper>
          <Progress label="응답률" percent={responseRate || 0} />
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
