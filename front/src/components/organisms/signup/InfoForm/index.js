import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SIGN_UP_STEP_INFO_SAVE, SIGN_UP_STEP_NEXT } from '../../../../../reducers/user';
import { ButtonWrap, InfoFormWrapper } from './style';
import { Button } from '../../../atoms';
import { FormInput } from '../../../molecules';
import useInput from '../../../../hooks/useInput';

const InfoForm = () => {
  const { signupStepInfo } = useSelector((state) => state.user);
  const [checkPassword, setCheckPassword] = useState('');
  const onChangeCheckPassword = useCallback((e) => {
    setCheckPassword(e.target.value);
  }, []);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput(signupStepInfo?.email || '');
  const [password, onChangePassword] = useInput(signupStepInfo?.password || '');
  const [nickname, onChangeNickname] = useInput(signupStepInfo?.nickname || '');

  const onNextClick = useCallback(() => {
    dispatch({
      type: SIGN_UP_STEP_INFO_SAVE,
      data: { email, password, nickname },
    });
    dispatch({ type: SIGN_UP_STEP_NEXT });
  }, [email, password, nickname]);

  return (
    <InfoFormWrapper>
      <FormInput
        size="large"
        id="email"
        label="E-mail"
        placeholder="email을 입력해주세요."
        essential
        value={email}
        onChange={onChangeEmail}
      />
      <FormInput
        size="large"
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        essential
        value={password}
        onChange={onChangePassword}
      />
      <FormInput
        size="large"
        id="checkPassword"
        label="비밀번호 확인"
        placeholder="비밀번호 확인을 입력해주세요."
        type="password"
        essential
        value={checkPassword}
        onChange={onChangeCheckPassword}
      />
      <FormInput
        size="large"
        id="nickname"
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        essential
        value={nickname}
        onChange={onChangeNickname}
      />
      <ButtonWrap>
        <Button
          type="line-primary"
          size="large"
          onClick={onNextClick}
        >
          다음단계
        </Button>
      </ButtonWrap>
    </InfoFormWrapper>
  );
};

export default InfoForm;
