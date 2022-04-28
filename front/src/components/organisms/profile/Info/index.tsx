import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { BiEdit } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import useInput from '@/hooks/useInput';
import { updateDescriptionAPI, updateNicknameAPI } from '@/api/user';
import { meKey, profileKey } from '@/../@utils/queryKey';
import { ButtonType, SizeType } from '@/../@types/utils';
import useIsState from '@/hooks/useIsState';
import { Button, Icon, Input } from '../../../atoms';
import {
  ContentText,
  ContentTitle,
  InfoBody,
  InfoButtonWrapper,
  InfoContent,
  InfoContentWrapper,
  InfoHeader,
  InfoWrapper,
} from './style';

const Info = () => {
  const queryClient = useQueryClient();
  const { profile } = useSelector(profileSelector);
  const me = useSelector(meSelector);
  const [isEditNickname, onChangeIsEditNickname] = useIsState(false);
  const [isEditDescription, onChangeIsEditDescription] = useIsState(false);

  const [nickname, onChangeNickname] = useInput<string>(
    profile?.nickname || ''
  );
  const [description, onChangeDescription] = useInput<string>(
    profile?.Userdetail?.description || ''
  );

  const nicknameMutation = useMutation(
    (data: { nickname: string }) => updateNicknameAPI(data),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(profileKey);
        void queryClient.invalidateQueries(meKey);
        void onChangeIsEditNickname();
      },
    }
  );
  const descMutation = useMutation(
    (data: { description: string }) => updateDescriptionAPI(data),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(profileKey);
        void queryClient.invalidateQueries(meKey);
        void onChangeIsEditDescription();
      },
    }
  );

  const onUpdateNickname = useCallback(() => {
    nicknameMutation.mutate({ nickname });
  }, [nickname]);

  const onUpdatDescription = useCallback(() => {
    descMutation.mutate({ description });
  }, [description]);

  return (
    <InfoWrapper>
      <InfoHeader>
        <h3>{profile?.nickname}님의 프로필</h3>
      </InfoHeader>
      <InfoBody>
        <InfoContentWrapper key="nickname">
          <InfoContent>
            <ContentTitle>
              <h4>닉네임</h4>
            </ContentTitle>
            {isEditNickname && me?.id === profile?.id ? (
              <Input
                size={SizeType.SMALL}
                value={nickname}
                onChange={onChangeNickname}
              />
            ) : (
              <ContentText>{profile?.nickname}</ContentText>
            )}
          </InfoContent>
          <InfoButtonWrapper>
            {me?.id === profile?.id &&
              (isEditNickname && me?.id === profile?.id ? (
                <div>
                  <Button
                    type={ButtonType.TEXT}
                    size={SizeType.SMALL}
                    onClick={onUpdateNickname}
                  >
                    저장
                  </Button>
                  <Button
                    type={ButtonType.TEXT}
                    size={SizeType.SMALL}
                    onClick={onChangeIsEditNickname}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <Button
                  icon={<Icon icon={<BiEdit />} />}
                  type={ButtonType.TEXT}
                  onClick={onChangeIsEditNickname}
                />
              ))}
          </InfoButtonWrapper>
        </InfoContentWrapper>
        <InfoContentWrapper key="description">
          <InfoContent>
            <ContentTitle>
              <h4>간단소개</h4>
            </ContentTitle>
            {isEditDescription && me?.id === profile?.id ? (
              <Input
                size={SizeType.SMALL}
                value={description}
                onChange={onChangeDescription}
              />
            ) : (
              <ContentText>{profile?.Userdetail?.description}</ContentText>
            )}
          </InfoContent>
          <InfoButtonWrapper>
            {me?.id === profile?.id &&
              (isEditDescription && me?.id === profile?.id ? (
                <div>
                  <Button
                    type={ButtonType.TEXT}
                    size={SizeType.SMALL}
                    onClick={onUpdatDescription}
                  >
                    저장
                  </Button>
                  <Button
                    type={ButtonType.TEXT}
                    size={SizeType.SMALL}
                    onClick={onChangeIsEditDescription}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <Button
                  icon={<Icon icon={<BiEdit />} />}
                  type={ButtonType.TEXT}
                  onClick={onChangeIsEditDescription}
                />
              ))}
          </InfoButtonWrapper>
        </InfoContentWrapper>
      </InfoBody>
    </InfoWrapper>
  );
};

export default Info;
