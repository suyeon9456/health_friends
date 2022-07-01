import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BiTrophy,
  BiCommentCheck,
  BiBuildingHouse,
  BiPencil,
  BiEdit,
} from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import { rematchRate, responseRate } from '@/../@utils/calculation';
import SideBarTabMenu from '@/components/molecules/SideBarTabMenu';
import { ButtonType } from '@/../@types/constant';
import { Modal, Tabs } from '@/components/molecules';
import { changeIsShowModal } from '@/../reducers/user';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserGymAPI } from '@/api/user';
import { profileKey } from '@/../@utils/queryKey';
import { Button, Icon } from '../../../atoms';
import Progress from '../../../molecules/Progress';
import {
  AvatarWrapper,
  InfoContent,
  InfoIconWrapper,
  InfoWrapper,
  SideBarWrapper,
} from './style';
import ProfileAvatar from './ProfileAvatar';
import GlobalCustomModal from '../../GlobalCustomModal';
import ModalSearchGym from '../../ModalSearchGym';

const UPDATEGYM = 'UPDATEGYM' as const;
const SideBar = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);

  const mutation = useMutation((data: number) => updateUserGymAPI(data), {
    onSuccess: () => {
      void queryClient.invalidateQueries(profileKey);
    },
  });

  const onSelectedGym = useCallback((id) => {
    if (!id) return;
    mutation.mutate(id);
  }, []);

  return (
    <>
      <SideBarWrapper>
        <AvatarWrapper>
          <ProfileAvatar />
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
                    <Button
                      type={ButtonType.TEXT}
                      icon={<Icon icon={<BiEdit />} />}
                      onClick={() => dispatch(changeIsShowModal(UPDATEGYM))}
                    />
                  </div>
                )
              )}
            </div>
          </InfoContent>
        </InfoWrapper>
        <SideBarTabMenu />
      </SideBarWrapper>
      <GlobalCustomModal id={UPDATEGYM}>
        <Modal
          title="이용중인 헬스장 변경"
          onCancel={() => dispatch(changeIsShowModal(null))}
          onSubmit={() => dispatch(changeIsShowModal(null))}
          footer
        >
          <ModalSearchGym onSelectedGym={onSelectedGym} />
        </Modal>
      </GlobalCustomModal>
    </>
  );
};

export default SideBar;
