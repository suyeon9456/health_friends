import React, { useCallback, useState, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { BiTrophy, BiCommentCheck, BiBuildingHouse } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import useIsState from '@/hooks/useIsState';
import { addImageAPI, uploadImageAPI } from '@/api/profile';
import { rematchRate, responseRate } from '@/../@utils/calculation';
import { profileKey } from '@/../@utils/queryKey';
import { ProfileMenuType } from '@/../@types/utils';
import SideBarTabMenu from '@/components/molecules/SideBarTabMenu';
import FormImage from '@/components/molecules/FormImage';
import { Icon } from '../../../atoms';
import ModalMatchingRequest from '../../ModalMatchingRequest';
import Progress from '../../../molecules/Progress';
import ModalPortal from '../../ModalPortal';
import {
  AvatarWrapper,
  InfoContent,
  InfoIconWrapper,
  InfoWrapper,
  SideBarWrapper,
} from './style';
import ProfileAvatar from './ProfileAvatar';

const SideBar = ({
  profileMenu,
  setProfileMenu,
}: {
  profileMenu: ProfileMenuType;
  setProfileMenu: React.Dispatch<SetStateAction<ProfileMenuType>>;
}) => {
  const queryClient = useQueryClient();
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

  const onRemoveUploadImage = useCallback(() => {
    setImgPath('');
  }, [imgPath]);

  return (
    <SideBarWrapper>
      <AvatarWrapper>
        {me?.id && isUpload ? (
          <FormImage
            imgPath={imgPath}
            uploadImage={uploadImage}
            addImage={addImage}
            onChangeIsUpload={onChangeIsUpload}
            onRemoveUploadImage={onRemoveUploadImage}
          />
        ) : (
          <ProfileAvatar onChangeIsUpload={onChangeIsUpload} />
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
      <SideBarTabMenu
        profileMenu={profileMenu}
        setProfileMenu={setProfileMenu}
      />
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
