import React, { useCallback, useEffect, useState, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BiTrophy,
  BiCommentCheck,
  BiBuildingHouse,
  BiUser,
  BiCalendar,
  BiReceipt,
  BiHeart,
} from 'react-icons/bi';

import {
  addProfileImageRequest,
  profileSelector,
  removeProfileImage,
  uploadProfileImageRequest,
} from '@/../reducers/profile';
import { ButtonType, Menu, ProfileMenuType } from '@/../@types/utils';
import useRematchRate from '@/hooks/useRematchRate';
import { useModalDispatch } from '@/../store/modalStore';
import { useQuery } from 'react-query';
import { Me } from '@/../@types/user';
import axios from 'axios';
import useRate from '../../../../hooks/useRate';
import Progress from '../../../molecules/Progress';
import ModalMatchingRequest from '../../ModalMatchingRequest';
import { Avatar, Button, Form, Icon, Upload } from '../../../atoms';
import {
  AvatarWrapper,
  InfoContent,
  InfoIconWrapper,
  InfoWrapper,
  MenuText,
  SideBarWrapper,
  SideMenu,
  SideMenuWrap,
} from './style';
import ModalPortal from '../../ModalPortal';

const SideBar = ({
  profileMenu,
  setProfileMenu,
}: {
  profileMenu: ProfileMenuType;
  setProfileMenu: React.Dispatch<SetStateAction<ProfileMenuType>>;
}) => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const { profile, imagePath, uploadProfileImageError } =
    useSelector(profileSelector);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseRate, onChangeResponseRate] = useRate({
    total: profile?.resSchedule?.length || 0,
    number:
      profile?.resSchedule?.filter(
        (f: {
          FriendId: number;
          id: number;
          isPermitted: boolean;
          permission: boolean;
        }) => f.isPermitted
      ).length || 0,
  });

  const { data: me } = useQuery<Me>(
    'user',
    async () => {
      const { data } = await axios.get('/user');
      return data;
    },
    { refetchOnWindowFocus: false, retry: false }
  );

  const onClickMenu = useCallback(
    (menu) => {
      setProfileMenu(menu);
    },
    [profileMenu]
  );

  useEffect(() => {
    if (profile) {
      onChangeResponseRate(
        profile.resSchedule?.length || 0,
        profile.resSchedule?.filter(
          (f: {
            FriendId: number;
            id: number;
            isPermitted: boolean;
            permission: boolean;
          }) => f.isPermitted
        ).length || 0
      );
    }
  }, [profile]);

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch(uploadProfileImageRequest(imageFormData));
  }, []);

  const onChangeUploadState = useCallback(() => {
    setUploadState((prev) => !prev);
  }, [uploadState]);

  const onAddProfileImage = useCallback(() => {
    const thumbImagePath = imagePath.replace(/\/original\//, '/thumb/');
    dispatch(addProfileImageRequest({ image: thumbImagePath }));
    onChangeUploadState();
  }, [imagePath]);

  const onRemoveUploadImage = useCallback(() => {
    dispatch(removeProfileImage());
  }, []);

  const onShowMatchingModal = useCallback(() => {
    contextDispatch({
      type: 'SHOW_CUSTOM_MODAL',
      payload: 'id',
    });
  }, [me?.id]);

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id && uploadState ? (
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
              <Button type={ButtonType.TEXT} onClick={onChangeUploadState}>
                취소
              </Button>
            </div>
          </>
        ) : (
          <>
            <Avatar
              size={128}
              src={profile?.Image ? `${profile?.Image?.src}` : ''}
            />
            {me?.id && profile?.id === me?.id ? (
              <div>
                <Button type={ButtonType.TEXT} onClick={onChangeUploadState}>
                  프로필 사진 변경하기
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  type={ButtonType.SIGNATURE}
                  onClick={onShowMatchingModal}
                >
                  매칭신청
                </Button>
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
          <Progress
            label="재매칭률"
            percent={
              profile?.matchingRecount
                ? useRematchRate(
                    profile?.matchingRecount,
                    profile?.matchingTotalCount
                  )
                : 0
            }
          />
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
            {profile?.Gyms.map(
              (gym: { id: number; address: string; name: string }) => (
                <div className="user-gym" key={gym.id}>
                  {gym.address} <a>{gym.name}</a>
                </div>
              )
            )}
          </div>
        </InfoContent>
      </InfoWrapper>
      <SideMenuWrap active={profileMenu}>
        <SideMenu
          key="info"
          id="info"
          onClick={() => onClickMenu(Menu.INFO)}
          className={profileMenu === Menu.INFO ? 'active' : ''}
        >
          <Icon icon={<BiUser />} />
          <MenuText>
            {me?.id && profile?.id === me?.id ? '내정보' : '정보'}
          </MenuText>
        </SideMenu>
        <SideMenu
          key="calendar"
          id="calendar"
          onClick={() => onClickMenu(Menu.CALENDAR)}
          className={profileMenu === Menu.CALENDAR ? 'active' : ''}
        >
          <Icon icon={<BiCalendar />} />
          <MenuText>매칭일정</MenuText>
        </SideMenu>
        <SideMenu
          key="record"
          id="record"
          onClick={() => onClickMenu(Menu.RECORD)}
          className={profileMenu === Menu.RECORD ? 'active' : ''}
        >
          <Icon icon={<BiReceipt />} />
          <MenuText>매칭기록</MenuText>
        </SideMenu>
        <SideMenu
          key="liked"
          id="liked"
          onClick={() => onClickMenu(Menu.LIKED)}
          className={profileMenu === Menu.LIKED ? 'active' : ''}
        >
          <Icon icon={<BiHeart />} />
          <MenuText>관심친구</MenuText>
        </SideMenu>
      </SideMenuWrap>
      <ModalPortal>
        {showModal && (
          <ModalMatchingRequest
            setShowModal={setShowModal}
            friend={profile}
            gymName={profile?.Gyms[0]?.name}
          />
        )}
      </ModalPortal>
    </SideBarWrapper>
  );
};

export default SideBar;
