import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { useLoadLoginedUser } from '@/hooks';
import useIsState from '@/hooks/useIsState';
import { ButtonType, ModalStatus } from '@/../@types/constant';
import { Avatar, Button } from '@/components/atoms';
import FormImage from '@/components/molecules/FormImage';
import { addImageAPI, uploadImageAPI } from '@/api/profile';
import { profileKey } from '@/../@utils/queryKey';
import { showCustomModal } from '@/../reducers/user';
import useGetProfile from '@/hooks/useGetProfile';
import { changeModal, useModalDispatch } from '@/../store/modalStore';
import GlobalCustomModal from '../../GlobalCustomModal';
import ModalMatchingRequest from '../../ModalMatchingRequest';

const MATCHING = 'MATCHING' as const;
const ProfileAvatar = () => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const queryClient = useQueryClient();

  const [imgPath, setImgPath] = useState<string>('');
  const [isUpload, onChangeIsUpload] = useIsState(false);
  const [buttonText, setButtonText] = useState('');

  const { data: profile } = useGetProfile();
  const { data: me } = useLoadLoginedUser();

  const uploadImage = useMutation((data: FormData) => uploadImageAPI(data), {
    onSuccess: (originalPath) => {
      if (typeof originalPath === 'string') {
        setImgPath(originalPath);
      }
    },
  });

  const addImage = useMutation((data: string) => addImageAPI(data), {
    onSuccess: () => {
      void queryClient.invalidateQueries(profileKey);
      contextDispatch(
        changeModal({
          status: ModalStatus.SUCCESS,
          message: '프로필이미지 등록에 성공하였습니다.',
        })
      );
    },
  });

  const onRemoveUploadImage = useCallback(() => {
    setImgPath('');
  }, [imgPath]);

  const onShowMatchingModal = useCallback(() => {
    dispatch(showCustomModal(MATCHING));
  }, []);

  useEffect(() => {
    if (me?.id && profile?.id === me?.id) {
      setButtonText('프로필 사진 변경하기');
      return;
    }
    setButtonText('매칭 신청');
  }, [me?.id]);

  return (
    <>
      {me?.id && isUpload ? (
        <FormImage
          imgPath={imgPath}
          uploadImage={uploadImage}
          addImage={addImage}
          onChangeIsUpload={onChangeIsUpload}
          onRemoveUploadImage={onRemoveUploadImage}
        />
      ) : (
        <>
          <Avatar
            size={128}
            src={profile?.Image ? `${profile?.Image?.src}` : ''}
          />
          <div>
            <Button
              type={ButtonType.TEXT}
              onClick={
                me?.id && profile?.id === me?.id
                  ? onChangeIsUpload
                  : onShowMatchingModal
              }
            >
              {buttonText}
            </Button>
          </div>
        </>
      )}
      <GlobalCustomModal id={MATCHING}>
        <ModalMatchingRequest
          selectedUser={profile}
          gymName={`${profile?.Gyms[0]?.addressRoad}${profile?.Gyms[0]?.name}`}
        />
      </GlobalCustomModal>
    </>
  );
};

export default ProfileAvatar;
