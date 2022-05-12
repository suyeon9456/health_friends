import React, { useCallback, useState, SetStateAction } from 'react';
import { useRouter } from 'next/router';
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
import { meSelector } from '@/../reducers/user';
import useIsState from '@/hooks/useIsState';
import { addImageAPI, uploadImageAPI } from '@/api/profile';
import { rematchRate, responseRate } from '@/../@utils/calculation';
import { originalToThumb } from '@/../@utils/regexp';
import { profileKey } from '@/../@utils/queryKey';
import { ButtonType, Menu, ProfileMenuType } from '@/../@types/utils';
import { Avatar, Button, Form, Icon, Upload } from '../../../atoms';
import ModalMatchingRequest from '../../ModalMatchingRequest';
import Progress from '../../../molecules/Progress';
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
  const [imgPath, setImgPath] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isUpload, onChangeIsUpload] = useIsState(false);

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
      const query =
        router.pathname === '/myinfo'
          ? { tab: menu }
          : { id: profile.id, tab: menu };
      void router.push({ query }, undefined, {
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

  const onAddProfileImage = useCallback(() => {
    const thumbImg = originalToThumb(imgPath);
    addImage.mutate(thumbImg);
    onChangeIsUpload();
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

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id && isUpload ? (
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
              <Button type={ButtonType.TEXT} onClick={onChangeIsUpload}>
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
                <Button type={ButtonType.TEXT} onClick={onChangeIsUpload}>
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
            percent={rematchRate(
              profile?.matchingTotalCount,
              profile?.matchingRecount
            )}
          />
        </InfoContent>
        <InfoContent key="response">
          <InfoIconWrapper>
            <Icon icon={<BiCommentCheck />} />
          </InfoIconWrapper>
          <Progress
            label="응답률"
            percent={responseRate(profile?.resSchedule)}
          />
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
          key={Menu.INFO}
          id={Menu.INFO}
          onClick={() => onClickMenu(Menu.INFO)}
          className={profileMenu === Menu.INFO ? 'active' : ''}
        >
          <Icon icon={<BiUser />} />
          <MenuText>
            {me?.id && profile?.id === me?.id ? '내정보' : '정보'}
          </MenuText>
        </SideMenu>
        <SideMenu
          key={Menu.CALENDAR}
          id={Menu.CALENDAR}
          onClick={() => onClickMenu(Menu.CALENDAR)}
          className={profileMenu === Menu.CALENDAR ? 'active' : ''}
        >
          <Icon icon={<BiCalendar />} />
          <MenuText>매칭일정</MenuText>
        </SideMenu>
        <SideMenu
          key={Menu.RECORD}
          id={Menu.RECORD}
          onClick={() => onClickMenu(Menu.RECORD)}
          className={profileMenu === Menu.RECORD ? 'active' : ''}
        >
          <Icon icon={<BiReceipt />} />
          <MenuText>매칭기록</MenuText>
        </SideMenu>
        <SideMenu
          key={Menu.LIKED}
          id={Menu.LIKED}
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
