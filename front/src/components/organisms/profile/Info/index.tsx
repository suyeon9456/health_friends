import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';

import useInput from '../../../../hooks/useInput';

import { Button, Icon, Input } from '../../../atoms';
import { ContentText, ContentTitle, InfoBody, InfoButtonWrapper, InfoContent, InfoContentWrapper, InfoHeader, InfoWrapper } from './style';
import { RootState } from '@/../store/configureStore';
import { updateMyDescriptionRequest, updateMyNicknameRequest } from '@/../reducers/profile';

const Info = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.user);
  const { profile, updateMyNicknameDone, updateMyDescriptionDone } = useSelector((state: RootState) => state.profile);
  const [isEditNickname, setIsEditNickname] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);

  const [nickname, onChangeNickname] = useInput<string>(profile?.nickname || '');
  const [description, onChangeDescription] = useInput<string>(profile?.description || '');

  const onChangeIsEditNickname = useCallback(() => {
    setIsEditNickname((prev) => !prev);
  }, [isEditNickname]);

  const onChangeIsEditDescription = useCallback(() => {
    setIsEditDescription((prev) => !prev);
  }, [isEditDescription]);

  const onUpdateNickname = useCallback(() => {
    dispatch(updateMyNicknameRequest({ nickname }));
  }, [nickname]);

  const onUpdatDescription = useCallback(() => {
    dispatch(updateMyDescriptionRequest({ description }));
  }, [description]);

  useEffect(() => {
    if (updateMyNicknameDone) {
      setIsEditNickname(false);
    }
  }, [updateMyNicknameDone, profile]);
  useEffect(() => {
    if (updateMyDescriptionDone) {
      setIsEditDescription(false);
    }
  }, [updateMyDescriptionDone]);

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
            {isEditNickname && me?.id === profile?.id
              ? <Input size="small" value={nickname} onChange={onChangeNickname} />
              : (
                <ContentText>
                  {profile?.nickname}
                </ContentText>
              )}
          </InfoContent>
          <InfoButtonWrapper>
            {me?.id === profile?.id && (
              isEditNickname && me.id === profile?.id
                ? (
                  <div>
                    <Button type="text" size="small" onClick={onUpdateNickname}>저장</Button>
                    <Button type="text" size="small" onClick={onChangeIsEditNickname}>취소</Button>
                  </div>
                )
                : <Button icon={<Icon icon={<BiEdit />} />} type="text" onClick={onChangeIsEditNickname} />
            )}
          </InfoButtonWrapper>
        </InfoContentWrapper>
        <InfoContentWrapper key="description">
          <InfoContent>
            <ContentTitle>
              <h4>간단소개</h4>
            </ContentTitle>
            {isEditDescription && me?.id === profile?.id
              ? <Input size="small" value={description} onChange={onChangeDescription} />
              : (
                <ContentText>
                  {profile?.Userdetail?.description}
                </ContentText>
              )}
          </InfoContent>
          <InfoButtonWrapper>
            {me?.id === profile?.id && (
              isEditDescription && me?.id === profile?.id
                ? (
                  <div>
                    <Button type="text" size="small" onClick={onUpdatDescription}>저장</Button>
                    <Button type="text" size="small" onClick={onChangeIsEditDescription}>취소</Button>
                  </div>
                )
                : <Button icon={<Icon icon={<BiEdit />} />} type="text" onClick={onChangeIsEditDescription} />
            )}
          </InfoButtonWrapper>
        </InfoContentWrapper>
      </InfoBody>
    </InfoWrapper>
  );
};

export default Info;
