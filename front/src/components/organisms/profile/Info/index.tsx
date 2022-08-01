import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import { secedeAPI, updateDescriptionAPI, updateNicknameAPI } from '@/api/user';
import { useLoadLoginedUser, useInput, useGetProfile } from '@/hooks';
import { meKey, profileKey } from '@/../@utils/queryKey';
import { ButtonType, ModalStatus } from '@/../@types/constant';
import EditInput from '@/components/molecules/EditInput';
import { Button } from '@/components/atoms';
import { changeModal, useModalDispatch } from '@/../store/modalStore';
import { InfoBody, InfoContentWrapper, InfoHeader, InfoWrapper } from './style';

const Info = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const contextDispatch = useModalDispatch();

  const { data: profile } = useGetProfile();
  const { data: me } = useLoadLoginedUser();

  const [nickname, onChangeNickname] = useInput<string>(
    profile?.nickname ?? ''
  );
  const [description, onChangeDescription] = useInput<string>(
    profile?.Userdetail?.description ?? ''
  );

  const nicknameMutation = useMutation(
    (data: { nickname: string }) => updateNicknameAPI(data),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(profileKey);
        void queryClient.invalidateQueries(meKey);
      },
    }
  );
  const descMutation = useMutation(
    (data: { description: string }) => updateDescriptionAPI(data),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(profileKey);
        void queryClient.invalidateQueries(meKey);
      },
    }
  );
  const secedeMutation = useMutation(() => secedeAPI(), {
    onSuccess: () => {
      contextDispatch(
        changeModal({
          status: ModalStatus.SUCCESS,
          message: '회원탈퇴가 완료되었습니다.',
          callback: () => router.push('/'),
        })
      );
    },
  });

  const onUpdateNickname = useCallback(() => {
    nicknameMutation.mutate({ nickname });
  }, [nickname]);

  const onUpdatDescription = useCallback(() => {
    descMutation.mutate({ description });
  }, [description]);

  const onSecede = useCallback(() => {
    secedeMutation.mutate();
  }, []);

  return (
    <InfoWrapper>
      <InfoHeader>
        <h3>{profile?.nickname}님의 프로필</h3>
        {me?.id === profile?.id && (
          <Button type={ButtonType.TEXT} onClick={onSecede}>
            회원탈퇴
          </Button>
        )}
      </InfoHeader>
      <InfoBody>
        <InfoContentWrapper key="nickname">
          <EditInput
            title="닉네임"
            value={nickname}
            content={profile?.nickname}
            isAuthorization={me && me?.id === profile?.id}
            isSuccess={nicknameMutation.isSuccess}
            onChange={onChangeNickname}
            onUpdateContent={onUpdateNickname}
          />
        </InfoContentWrapper>
        <InfoContentWrapper key="description">
          <EditInput
            title="간단소개"
            value={description}
            content={profile?.Userdetail?.description}
            isAuthorization={me && me?.id === profile?.id}
            isSuccess={descMutation.isSuccess}
            onChange={onChangeDescription}
            onUpdateContent={onUpdatDescription}
          />
        </InfoContentWrapper>
      </InfoBody>
    </InfoWrapper>
  );
};

export default Info;
