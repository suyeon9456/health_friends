import React, { useCallback, useEffect, useState, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiTrophy, BiCommentCheck, BiBuildingHouse, BiUser, BiCalendar, BiReceipt, BiHeart } from 'react-icons/bi';

import { RootState } from '@/../store/configureStore';
import useRate from '../../../../hooks/useRate';
import Progress from '../../../molecules/Progress';
import { Avatar, Button, Form, Icon, Upload } from '../../../atoms';
import ModalMatchingRequest from '../../ModalMatchingRequest';
import { AvatarWrapper, InfoContent, InfoIconWrapper, InfoWrapper, MenuText, SideBarWrapper, SideMenu, SideMenuWrap } from './style';
import { ADD_PROFILEIMAGE_REQUEST, REMOVE_PROFILEIMAGE, UPLOAD_PROFILEIMAGE_REQUEST } from '@/../@types/utils';

const menu = {
  INFO: 'INFO',
  RECORD: 'RECORD',
  CALENDAR: 'CALENDAR',
  LIKED: 'LIKED',
} as const;

type ProfileMenuType = typeof menu[keyof typeof menu];


const SideBar = ({ profileMenu, setProfileMenu }: {
  profileMenu: ProfileMenuType;
  setProfileMenu: React.Dispatch<SetStateAction<ProfileMenuType>>;
}) => {
  const dispatch = useDispatch();
  const { profile, me, imagePath, uploadProfileImageError } = useSelector((state: RootState) => state.user);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseRate,
    onChangeResponseRate] = useRate({
    total: profile?.resSchedule?.length || 0,
    number: profile?.resSchedule?.filter((f: {
      FriendId: number;
      id: number;
      isPermitted: boolean;
      permission: boolean;
    }) => f.isPermitted).length || 0,
  });

  const onClickMenu = useCallback((menu) => {
    setProfileMenu(menu);
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

  const onShowMatchingModal = useCallback(() => {
    setShowModal(true);
  }, [me && me.id]);

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id && uploadState
          ? (
            <>
              <Form encType="multipart/form-data">
                <Upload
                  id={imagePath}
                  name="image"
                  src={imagePath}
                  onChange={onChangeImage}
                  uploadError={uploadProfileImageError}
                  onAddImage={onAddProfileImage}
                  onRemove={onRemoveUploadImage}
                />
              </Form>
              <div>
                <Button type="text" onClick={onChangeUploadState}>취소</Button>
              </div>
            </>
          )
          : (
            <>
              <Avatar size={128} src={profile?.Image ? `${profile?.Image?.src}` : ''} />
              {(me?.id && (profile?.id === me?.id)) ? (
                <div>
                  <Button type="text" onClick={onChangeUploadState}>프로필 사진 변경하기</Button>
                </div>
              ) : (
                <div>
                  <Button type="signature" onClick={onShowMatchingModal}>매칭신청</Button>
                </div>
              )}
            </>
          )}
      </AvatarWrapper>
      <InfoWrapper>
        <InfoContent key="matching">
          <InfoIconWrapper>
            <Icon icon={<BiTrophy />} />
          </InfoIconWrapper>
          <Progress label="재매칭률" percent={profile?.Userdetail?.rematchingRate} />
        </InfoContent>
        <InfoContent key="response">
          <InfoIconWrapper>
            <Icon icon={<BiCommentCheck />} />
          </InfoIconWrapper>
          <Progress label="응답률" percent={responseRate || 0} />
        </InfoContent>
        <InfoContent key="address">
          <InfoIconWrapper>
            <Icon icon={<BiBuildingHouse />} />
          </InfoIconWrapper>
          <div>
            <span>이용중인 헬스장: </span>
            {profile?.Gyms.map((gym: { id: number; address: string; name: string; }) => (
              <div className="user-gym" key={gym.id}>{gym.address} <a>{gym.name}</a></div>
            ))}
          </div>
        </InfoContent>
      </InfoWrapper>
      <SideMenuWrap active={profileMenu}>
        <SideMenu
          key="info"
          id="info"
          onClick={() => onClickMenu(menu.INFO)}
          className={profileMenu === menu.INFO ? 'active' : ''}
        >
          <Icon icon={<BiUser />} />
          <MenuText>{(me?.id && (profile?.id === me?.id)) ? '내정보' : '정보'}</MenuText>
        </SideMenu>
        <SideMenu
          key="calendar"
          id="calendar"
          onClick={() => onClickMenu(menu.CALENDAR)}
          className={profileMenu === menu.CALENDAR ? 'active' : ''}
        >
          <Icon icon={<BiCalendar />} />
          <MenuText>매칭일정</MenuText>
        </SideMenu>
        <SideMenu
          key="record"
          id="record"
          onClick={() => onClickMenu(menu.RECORD)}
          className={profileMenu === menu.RECORD ? 'active' : ''}
        >
          <Icon icon={<BiReceipt />} />
          <MenuText>매칭기록</MenuText>
        </SideMenu>
        <SideMenu
          key="liked"
          id="liked"
          onClick={() => onClickMenu(menu.LIKED)}
          className={profileMenu === menu.LIKED ? 'active' : ''}
        >
          <Icon icon={<BiHeart />} />
          <MenuText>관심친구</MenuText>
        </SideMenu>
      </SideMenuWrap>
      <ModalMatchingRequest
        showModal={showModal}
        setShowModal={setShowModal}
        friend={profile}
        gymName={profile?.Gyms[0]?.name}
      />
    </SideBarWrapper>
  );
};

export default SideBar;
