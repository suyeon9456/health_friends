import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import {
  AgeOptions,
  ButtonType,
  CareerOptions,
  GenderOptions,
  InfoContent,
  RoleOptions,
  SizeType,
} from '@/../@types/utils';
import { Information } from '@/components/molecules';
import { profileRangeTime } from '@/../@utils/date';
import { Button } from '../../../atoms';
import ModalEditInfo from '../ModalEditInfo';
import ModalPortal from '../../ModalPortal';
import {
  ContentTitle,
  MoreInfoBody,
  MoreInfoContent,
  MoreInfoWrapper,
} from './style';

const MoreInfo = () => {
  const { profile } = useSelector(profileSelector);
  const me = useSelector(meSelector);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<string>('');

  const onChangeShowEditModal = useCallback(
    (e) => {
      if (e) {
        setTargetId(e.target.id);
        setShowEditModal((prev) => !prev);
      }
    },
    [showEditModal]
  );
  return (
    <MoreInfoWrapper>
      <MoreInfoBody>
        <MoreInfoContent key={InfoContent.MORE}>
          <ContentTitle>
            <h4>추가정보</h4>
            {me?.id === profile?.id && (
              <Button
                type={ButtonType.PRIMARY}
                size={SizeType.SMALL}
                onClick={onChangeShowEditModal}
                {...{ id: 'more-info' }}
              >
                수정
              </Button>
            )}
          </ContentTitle>
          <Information
            type={InfoContent.MORE}
            age={AgeOptions[parseInt(profile?.age, 10)]}
            time={profileRangeTime(
              profile?.Userdetail?.startTime,
              profile?.Userdetail?.endTime
            )}
            career={CareerOptions[parseInt(profile?.career, 10)]}
            gender={
              GenderOptions[
                GenderOptions.findIndex(
                  (option: { value: string }) =>
                    option.value === profile?.gender
                )
              ]
            }
            role={RoleOptions[parseInt(profile?.role, 10)]}
          />
        </MoreInfoContent>
        <MoreInfoContent key={InfoContent.FRIENDS}>
          <ContentTitle>
            <h4>매칭되고 싶은 친구정보</h4>
            {me?.id === profile?.id && (
              <Button
                type={ButtonType.PRIMARY}
                size={SizeType.SMALL}
                onClick={onChangeShowEditModal}
                {...{ id: 'friends-info' }}
              >
                수정
              </Button>
            )}
          </ContentTitle>
          <Information
            type={InfoContent.FRIENDS}
            age={AgeOptions[parseInt(profile?.Userdetail?.friendsAge, 10)]}
            career={
              CareerOptions[parseInt(profile?.Userdetail?.friendsCareer, 10)]
            }
            gender={
              GenderOptions[
                GenderOptions.findIndex(
                  (option: { value: string }) =>
                    option.value === profile?.Userdetail?.friendsGender
                )
              ]
            }
            role={RoleOptions[parseInt(profile?.Userdetail?.friendsRole, 10)]}
          />
        </MoreInfoContent>
      </MoreInfoBody>
      <ModalPortal>
        {showEditModal && (
          <ModalEditInfo
            title={targetId === 'more-info' ? '추가정보 수정' : '친구정보 수정'}
            targetId={targetId}
            setCloseModal={setShowEditModal}
            onCancel={onChangeShowEditModal}
          />
        )}
      </ModalPortal>
    </MoreInfoWrapper>
  );
};

export default MoreInfo;
