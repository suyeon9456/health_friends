import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { hiddenCustomModal, showCustomModal } from '@/../reducers/user';
import { profileRangeTime } from '@/../@utils/date';
import {
  AgeOptions,
  ButtonType,
  CareerOptions,
  GenderOptions,
  InfoContent,
  InfoContentType,
  RoleOptions,
  SizeType,
} from '@/../@types/constant';
import { Profile } from '@/../@types/user';
import GlobalCustomModal from '@/components/organisms/GlobalCustomModal';
import ModalEditInfo from '@/components/organisms/profile/ModalEditInfo';
import { Button } from '@/components/atoms';
import { ContentTitle, MoreInfoContent } from './style';
import Information from '../Information';

const MoreInfoCard = ({
  type,
  title,
  profile,
  isAuthorization = false,
}: {
  type: InfoContentType;
  title: string;
  profile?: Profile;
  isAuthorization?: boolean;
}) => {
  const dispatch = useDispatch();
  const onShowModal = useCallback(() => {
    dispatch(showCustomModal(type));
  }, [type]);
  return (
    <>
      <MoreInfoContent>
        <ContentTitle>
          <h4>{title}</h4>
          {isAuthorization && (
            <Button
              type={ButtonType.PRIMARY}
              size={SizeType.SMALL}
              onClick={onShowModal}
              {...{ id: 'more-info' }}
            >
              수정
            </Button>
          )}
        </ContentTitle>
        {type === InfoContent.MORE ? (
          <Information
            type={type}
            age={AgeOptions[parseInt(profile?.age ?? '1', 10)]}
            time={profileRangeTime(
              profile?.Userdetail?.startTime ?? '',
              profile?.Userdetail?.endTime ?? ''
            )}
            career={CareerOptions[parseInt(profile?.career ?? '1', 10)]}
            gender={
              GenderOptions[
                GenderOptions.findIndex(
                  (option: { value: string }) =>
                    option.value === profile?.gender
                )
              ]
            }
            role={RoleOptions[parseInt(profile?.role ?? '1', 10)]}
          />
        ) : (
          <Information
            type={type}
            age={
              AgeOptions[parseInt(profile?.Userdetail?.friendsAge ?? '1', 10)]
            }
            career={
              CareerOptions[
                parseInt(profile?.Userdetail?.friendsCareer ?? '1', 10)
              ]
            }
            gender={
              GenderOptions[
                GenderOptions.findIndex(
                  (option: { value: string }) =>
                    option.value === profile?.Userdetail?.friendsGender
                )
              ]
            }
            role={
              RoleOptions[parseInt(profile?.Userdetail?.friendsRole ?? '1', 10)]
            }
          />
        )}
      </MoreInfoContent>
      <GlobalCustomModal id={type}>
        <ModalEditInfo
          type={type}
          title={type === InfoContent.MORE ? '추가정보 수정' : '친구정보 수정'}
          onCancel={() => dispatch(hiddenCustomModal(type))}
        />
      </GlobalCustomModal>
    </>
  );
};

export default MoreInfoCard;
