import React, { useCallback, useEffect, useState, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import {
  BiTrophy,
  BiCommentCheck,
  BiBuildingHouse,
  BiUser,
  BiCalendar,
  BiReceipt,
  BiHeart,
} from 'react-icons/bi';

import { useModalDispatch } from '@/../store/modalStore';
import { profileSelector } from '@/../reducers/profile';
import useRate from '@/hooks/useRate';
import { addImageAPI, uploadImageAPI } from '@/api/profile';
import { profileKey } from '@/../@utils/queryKey';
import { originalToThumb } from '@/../@utils/regexp';
import { ButtonType, Menu, ProfileMenuType } from '@/../@types/utils';
import { meSelector } from '@/../reducers/user';
import { useRouter } from 'next/router';
import { rematchRate } from '@/../@utils/calculation';
import Progress from '../../../molecules/Progress';
import { Avatar, Button, Form, Icon, Upload } from '../../../atoms';
import ModalMatchingRequest from '../../ModalMatchingRequest';
import ModalPortal from '../../ModalPortal';
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

const SideBar = ({
  profileMenu,
  setProfileMenu,
}: {
  profileMenu: ProfileMenuType;
  setProfileMenu: React.Dispatch<SetStateAction<ProfileMenuType>>;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const contextDispatch = useModalDispatch();
  const me = useSelector(meSelector);
  const { profile } = useSelector(profileSelector);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseRate, onChangeResponseRate] = useRate({
    total: profile?.resSchedule?.length || 0,
    number:
      profile?.resSchedule?.filter(
        (f: { isPermitted: boolean }) => f.isPermitted
      ).length || 0,
  });

  const uploadImage = useMutation((data: FormData) => uploadImageAPI(data), {
    onSuccess: (originalPath) => {
      if (typeof originalPath === 'string') {
        setImgPath(originalPath);
      }
    },
  });

  const addImage = useMutation((data: string) => addImageAPI(data), {
    onSuccess: () => queryClient.invalidateQueries(profileKey),
  });

  const onClickMenu = useCallback(
    (menu) => {
      console.log('query', router.query);
      console.log('menu', menu);
      void router.push({ query: { id: profile.id, tab: menu } }, undefined, {
        shallow: true,
      });
      setProfileMenu(menu);
    },
    [profileMenu, profile]
  );

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    uploadImage.mutate(imageFormData);
  }, []);

  const onChangeUploadState = useCallback(() => {
    setUploadState((prev) => !prev);
  }, [uploadState]);

  const onAddProfileImage = useCallback(() => {
    const thumbImg = originalToThumb(imgPath);
    addImage.mutate(thumbImg);
    onChangeUploadState();
  }, [imgPath]);

  const onRemoveUploadImage = useCallback(() => {
    setImgPath('');
  }, [imgPath]);

  const onShowMatchingModal = useCallback(() => {
    contextDispatch({
      type: 'SHOW_CUSTOM_MODAL',
      payload: 'id',
    });
  }, [me?.id]);

  useEffect(() => {
    if (profile) {
      onChangeResponseRate(
        profile.resSchedule?.length || 0,
        profile.resSchedule?.filter(
          (f: { isPermitted: boolean }) => f.isPermitted
        ).length || 0
      );
    }
  }, [profile]);

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id && uploadState ? (
          <>
            <Form encType="multipart/form-data">
              <Upload
                id={imgPath}
                name="image"
                src={imgPath}
                onChange={onChangeImage}
                uploadError={uploadImage.isError}
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
                ? rematchRate(
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
