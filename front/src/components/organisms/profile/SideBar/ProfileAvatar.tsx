import React, { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadLoginedUser } from '@/hooks';
import useIsState from '@/hooks/useIsState';
import { ButtonType } from '@/../@types/constant';
import { profileSelector } from '@/../reducers/profile';
import { Avatar, Button } from '@/components/atoms';
import FormImage from '@/components/molecules/FormImage';
import { addImageAPI, uploadImageAPI } from '@/api/profile';
import { profileKey } from '@/../@utils/queryKey';
import { showCustomModal } from '@/../reducers/user';
import GlobalCustomModal from '../../GlobalCustomModal';
import ModalMatchingRequest from '../../ModalMatchingRequest';

const MATCHING = 'MATCHING' as const;
const ProfileAvatar = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);
  const queryClient = useQueryClient();

  const [imgPath, setImgPath] = useState<string>('');
  const [isUpload, onChangeIsUpload] = useIsState(false);

  const { data: me } = useLoadLoginedUser();

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

  const onShowMatchingModal = useCallback(() => {
    dispatch(showCustomModal(MATCHING));
  }, []);

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
      )}
      <GlobalCustomModal id={MATCHING}>
        <ModalMatchingRequest
          selectedUser={profile}
          gymName={profile?.Gyms[0]?.name}
        />
      </GlobalCustomModal>
    </>
  );
};

export default ProfileAvatar;
