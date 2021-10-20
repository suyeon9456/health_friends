import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

import useInput from '../../../../hooks/useInput';
import { Button, Input } from '../../../atoms';
// import { Alert } from '../../../molecules';
import { ContentText, ContentTitle, InfoBody, InfoButtonWrapper, InfoContent, InfoContentWrapper, InfoHeader, InfoWrapper } from './style';
import { UPDATE_MY_DESCRIPTION_REQUEST, UPDATE_MY_NICKNAME_REQUEST } from '../../../../../reducers/user';

const Info = () => {
  const { me, updateMyNicknameDone, updateMyDescriptionDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [stateWarning, setStateWarning] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);

  const [nickname, onChangeNickname] = useInput('');
  const [description, onChangeDescription] = useInput('');

  const onChangeIsEditNickname = useCallback(() => {
    setIsEditNickname((prev) => !prev);
  }, [isEditNickname]);

  const onChangeIsEditDescription = useCallback(() => {
    setIsEditDescription((prev) => !prev);
  }, [isEditDescription]);

  const onUpdateNickname = useCallback(() => {
    dispatch({
      type: UPDATE_MY_NICKNAME_REQUEST,
      data: { nickname },
    });
  }, [nickname]);

  const onUpdatDescription = useCallback(() => {
    dispatch({
      type: UPDATE_MY_DESCRIPTION_REQUEST,
      data: { description },
    });
  }, [description]);

  useEffect(() => {
    // console.log(stateWarning);
    // console.log(!(me && me.id));
    // if (!(me && me.id)) {
    //   setStateWarning(true);
    // }
  }, [me && me.id]);

  useEffect(() => {
    if (updateMyNicknameDone) {
      setIsEditNickname(false);
    }
  }, [updateMyNicknameDone]);
  useEffect(() => {
    if (updateMyDescriptionDone) {
      setIsEditDescription(false);
    }
  }, [updateMyDescriptionDone]);
  return (
    <InfoWrapper>
      <InfoHeader>
        <h2>{me?.nickname}님의 프로필</h2>
      </InfoHeader>
      <InfoBody>
        <InfoContentWrapper key="nickname">
          <InfoContent>
            <ContentTitle>
              <h4>닉네임</h4>
            </ContentTitle>
            {isEditNickname
              ? <Input size="small" value={nickname} onChange={onChangeNickname} />
              : (
                <ContentText>
                  {me?.nickname}
                </ContentText>
              )}
          </InfoContent>
          <InfoButtonWrapper>
            {isEditNickname
              ? (
                <div>
                  <Button type="text" size="small" onClick={onUpdateNickname}>저장</Button>
                  <Button type="text" size="small" onClick={onChangeIsEditNickname}>취소</Button>
                </div>
              )
              : <Button icon={<EditOutlined />} type="text" onClick={onChangeIsEditNickname} />}
          </InfoButtonWrapper>
        </InfoContentWrapper>
        <InfoContentWrapper key="description">
          <InfoContent>
            <ContentTitle>
              <h4>간단소개</h4>
            </ContentTitle>
            {isEditDescription
              ? <Input size="small" value={description} onChange={onChangeDescription} />
              : (
                <ContentText>
                  {me?.Userdetail?.description}
                </ContentText>
              )}
          </InfoContent>
          <InfoButtonWrapper>
            {isEditDescription
              ? (
                <div>
                  <Button type="text" size="small" onClick={onUpdatDescription}>저장</Button>
                  <Button type="text" size="small" onClick={onChangeIsEditDescription}>취소</Button>
                </div>
              )
              : <Button icon={<EditOutlined />} type="text" onClick={onChangeIsEditDescription} />}
          </InfoButtonWrapper>
        </InfoContentWrapper>
      </InfoBody>
      {/* {stateWarning && (
        <Alert
          type="warning"
          action={(
            <Button
              block
              // onClick={onChangeStateWarning}
            >
              확인
            </Button>
          )}
          message="로그인이 필요한 페이지입니다."
        />
      )} */}
    </InfoWrapper>
  );
};

export default Info;
