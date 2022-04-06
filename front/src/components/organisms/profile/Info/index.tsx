import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BiEdit } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import axios from 'axios';
import { ButtonType, SizeType } from '@/../@types/utils';
import { Me } from '@/../@types/user';
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
import useInput from '../../../../hooks/useInput';

const Info = () => {
  const queryClient = useQueryClient();
  const nicknameMutation = useMutation((data: { nickname: string }) =>
    axios.patch('/user/nickname', data)
  );
  const descMutation = useMutation((data: { description: string }) =>
    axios.patch('/user/description', data)
  );

  const { data: me } = useQuery<Me>(
    'user',
    async () => {
      const { data } = await axios.get('/user');
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const { profile } = useSelector(profileSelector);
  const [isEditNickname, setIsEditNickname] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);

  const [nickname, onChangeNickname] = useInput<string>(
    profile?.nickname || ''
  );
  const [description, onChangeDescription] = useInput<string>(
    profile?.Userdetail?.description || ''
  );

  const onChangeIsEditNickname = useCallback(() => {
    setIsEditNickname((prev) => !prev);
  }, [isEditNickname]);

  const onChangeIsEditDescription = useCallback(() => {
    setIsEditDescription((prev) => !prev);
  }, [isEditDescription]);

  const onUpdateNickname = useCallback(() => {
    nicknameMutation.mutate({ nickname });
  }, [nickname]);

  const onUpdatDescription = useCallback(() => {
    descMutation.mutate({ description });
  }, [description]);

  useEffect(() => {
    if (nicknameMutation.isSuccess) {
      setIsEditNickname(false);
      void queryClient.invalidateQueries('profile');
      void queryClient.invalidateQueries('user');
    }
  }, [nicknameMutation.isSuccess]);
  useEffect(() => {
    if (descMutation.isSuccess) {
      setIsEditDescription(false);
      void queryClient.invalidateQueries('profile');
      void queryClient.invalidateQueries('user');
    }
  }, [descMutation.isSuccess]);

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
