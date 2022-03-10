import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiGroup, BiHeart, BiRun, BiTime, BiUser } from 'react-icons/bi';

import { userSelector } from '@/../reducers/user';
import { profileSelector } from '@/../reducers/profile';
import { InformationItem, Button, Icon } from '../../../atoms';
import { Content, ContentTitle, MoreInfoBody, MoreInfoContent, MoreInfoWrapper } from './style';
import ModalEditInfo from '../ModalEditInfo';
import { AgeOptions, CareerOptions, GenderOptions, RoleOptions } from '@/../@types/utils';

const MoreInfo = () => {
  const { me } = useSelector(userSelector);
  const { profile } = useSelector(profileSelector);
  const [showEditModal, setShowEditModal] = useState(false);
  const [targetId, setTargetId] = useState('');

  const onChangeShowEditModal = useCallback((e) => {
    if (e) {
      setTargetId(e.target.id);
      setShowEditModal((prev) => !prev);
    }
  }, [showEditModal]);
  return (
    <MoreInfoWrapper>
      <MoreInfoBody>
        <MoreInfoContent key="more-info">
          <ContentTitle>
            <h4>추가정보</h4>
            {me?.id === profile?.id && (
              <Button
                type="primary"
                size="small"
                onClick={onChangeShowEditModal}
                {...{ id: 'more-info' }}
              >
                수정
              </Button>
            )}
          </ContentTitle>
          <Content>
            <InformationItem
              title="나이"
              icon={<Icon icon={<BiUser />} />}
              content={AgeOptions.find((option: { value: number; }) => (
                option.value === parseInt(profile?.age, 10)))?.text}
            />
            <InformationItem
              title="운동시간"
              icon={<Icon icon={<BiTime />} />}
              content={`${profile?.Userdetail?.startTime || '00:00'} ~ ${profile?.Userdetail?.endTime || '00:00'}`}
            />
            <InformationItem
              title="운동경력"
              icon={<Icon icon={<BiRun />} />}
              content={
                CareerOptions.find((option: { value: number; }) => option.value === parseInt(profile?.career, 10))?.text
              }
            />
            <InformationItem
              title="성별"
              icon={<Icon icon={<BiHeart />} />}
              content={GenderOptions.find((option: { value: string; }) => option.value === profile?.gender)?.text}
            />
            <InformationItem
              title="역할"
              icon={<Icon icon={<BiGroup />} />}
              content={RoleOptions.find((option: { value: number; }) => (
                option.value === parseInt(profile?.role, 10)))?.text}
            />
          </Content>
        </MoreInfoContent>
        <MoreInfoContent key="more-friends-info">
          <ContentTitle>
            <h4>매칭되고 싶은 친구정보</h4>
            {me?.id === profile?.id && (
              <Button
                type="primary"
                size="small"
                onClick={onChangeShowEditModal}
                {...{ id: 'friends-info' }}
              >
                수정
              </Button>
            )}
          </ContentTitle>
          <Content>
            <InformationItem
              title="나이"
              icon={<Icon icon={<BiUser />} />}
              content={AgeOptions.find((option: { value: number; }) => (
                option.value === parseInt(profile?.Userdetail?.friendsAge, 10)))?.text}
            />
            <InformationItem
              title="운동경력"
              icon={<Icon icon={<BiRun />} />}
              content={CareerOptions.find((option: { value: number; }) => (
                option.value === parseInt(profile?.Userdetail?.friendsCareer, 10)))?.text}
            />
            <InformationItem
              title="성별"
              icon={<Icon icon={<BiHeart />} />}
              content={GenderOptions.find((option: { value: string; }) => (
                option.value === profile?.Userdetail?.friendsGender))?.text}
            />
            <InformationItem
              title="역할"
              icon={<Icon icon={<BiGroup />} />}
              content={RoleOptions.find((option: { value: number; }) => (
                option.value === parseInt(profile?.Userdetail?.friendsRole, 10)))?.text}
            />
          </Content>
        </MoreInfoContent>
      </MoreInfoBody>
      <ModalEditInfo
        title={targetId === 'more-info' ? '추가정보 수정' : '친구정보 수정'}
        targetId={targetId}
        show={showEditModal}
        setCloseModal={setShowEditModal}
        onCancel={onChangeShowEditModal}
      />
    </MoreInfoWrapper>
  );
};

export default MoreInfo;
