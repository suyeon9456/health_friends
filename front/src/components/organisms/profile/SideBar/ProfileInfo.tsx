import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  BiTrophy,
  BiCommentCheck,
  BiBuildingHouse,
  BiEdit,
} from 'react-icons/bi';

import { rematchRate, responseRate } from '@/../@utils/calculation';
import { ButtonType } from '@/../@types/constant';
import { Modal } from '@/components/molecules';
import { hiddenCustomModal, showCustomModal } from '@/../reducers/user';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserGymAPI } from '@/api/user';
import { profileKey } from '@/../@utils/queryKey';
import useGetProfile from '@/hooks/useGetProfile';
import { Button, Icon } from '../../../atoms';
import Progress from '../../../molecules/Progress';
import {
  AvatarWrapper,
  InfoContent,
  InfoIconWrapper,
  InfoWrapper,
} from './style';
import ProfileAvatar from './ProfileAvatar';
import GlobalCustomModal from '../../GlobalCustomModal';
import ModalSearchGym from '../../ModalSearchGym';

const UPDATEGYM = 'UPDATEGYM' as const;
const ProfileInfo = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data: profile } = useGetProfile();

  const mutation = useMutation((data: number) => updateUserGymAPI(data), {
    onSuccess: () => {
      void queryClient.invalidateQueries(profileKey);
    },
  });

  const onSelectedGym = useCallback((id: number) => {
    if (!id) return;
    mutation.mutate(id);
  }, []);

  const onHiddenModal = useCallback(() => {
    dispatch(hiddenCustomModal(UPDATEGYM));
  }, []);

  const rematchPercent = useMemo(() => {
    if (!profile?.matchingTotalCount || !profile?.matchingRecount) return 0;
    return rematchRate(profile?.matchingTotalCount, profile?.matchingRecount);
  }, [profile?.matchingTotalCount, profile?.matchingRecount]);

  const responsePercent = useMemo(() => {
    if (!profile?.resSchedule) return 0;
    return responseRate(profile?.resSchedule);
  }, [profile?.resSchedule]);

  return (
    <>
      <AvatarWrapper>
        <ProfileAvatar />
      </AvatarWrapper>
      <InfoWrapper>
        <InfoContent key="matching">
          <InfoIconWrapper>
            <Icon icon={<BiTrophy />} />
          </InfoIconWrapper>
          <Progress label="재매칭률" percent={rematchPercent} />
        </InfoContent>
        <InfoContent key="response">
          <InfoIconWrapper>
            <Icon icon={<BiCommentCheck />} />
          </InfoIconWrapper>
          <Progress label="응답률" percent={responsePercent} />
        </InfoContent>
        <InfoContent key="address">
          <InfoIconWrapper>
            <Icon icon={<BiBuildingHouse />} />
          </InfoIconWrapper>
          <div>
            <span>이용중인 헬스장: </span>
            <div className="user-gym" key={profile?.Gyms[0].id}>
              {profile?.Gyms[0].address} <a>{profile?.Gyms[0].name}</a>
              <Button
                type={ButtonType.TEXT}
                icon={<Icon icon={<BiEdit />} />}
                onClick={() => dispatch(showCustomModal(UPDATEGYM))}
              />
            </div>
          </div>
        </InfoContent>
      </InfoWrapper>
      <GlobalCustomModal id={UPDATEGYM}>
        <Modal
          title="이용중인 헬스장 변경"
          onCancel={onHiddenModal}
          onSubmit={onHiddenModal}
          footer
        >
          <ModalSearchGym onSelectedGym={onSelectedGym} />
        </Modal>
      </GlobalCustomModal>
    </>
  );
};

export default ProfileInfo;
