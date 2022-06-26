import React, { useCallback } from 'react';
import { ButtonType } from '@/../@types/utils';
import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import { Avatar, Button } from '@/components/atoms';
import { useSelector } from 'react-redux';
import { useModalDispatch } from '@/../store/modalStore';

const ProfileAvatar = ({
  onChangeIsUpload,
}: {
  onChangeIsUpload: () => void;
}) => {
  const contextDispatch = useModalDispatch();
  const me = useSelector(meSelector);
  const { profile } = useSelector(profileSelector);

  const onShowMatchingModal = useCallback(() => {
    contextDispatch({
      type: 'SHOW_CUSTOM_MODAL',
      payload: 'id',
    });
  }, [me?.id]);

  return (
    <>
      <Avatar size={128} src={profile?.Image ? `${profile?.Image?.src}` : ''} />
      {me?.id && profile?.id === me?.id ? (
        <div>
          <Button type={ButtonType.TEXT} onClick={onChangeIsUpload}>
            프로필 사진 변경하기
          </Button>
        </div>
      ) : (
        <div>
          <Button type={ButtonType.SIGNATURE} onClick={onShowMatchingModal}>
            매칭신청
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfileAvatar;
