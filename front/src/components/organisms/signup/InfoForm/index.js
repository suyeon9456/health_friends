import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';

import { SIGN_UP_STEP_INFO_SAVE } from '../../../../../reducers/user';
import { InfoFormWrapper } from './style';
import Button from '../../../atoms/Button';
import FormInput from '../../../molecules/FormInput';
import useInput from '../../../../hooks/useInput';

const InfoForm = ({ setProcess }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [checkPassword, setCheckPassword] = useState('');
  const dispatch = useDispatch();
  const onChangeCheckPassword = useCallback((e) => {
    setCheckPassword(e.target.value);
  }, []);

  const onNextClick = useCallback(() => {
    dispatch({
      type: SIGN_UP_STEP_INFO_SAVE,
      data: { email, password, nickname },
    });
    setProcess((prev) => prev + 1);
  }, [email, password, nickname]);

  return (
    <>
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
      </InfoFormWrapper>
      <div>
        <Button
          type="line-primary"
          size="large"
          onClick={onNextClick}
        >
          다음단계
        </Button>
      </div>
    </>
  );
};

InfoForm.propTypes = {
  setProcess: PropTypes.any.isRequired,
};

export default InfoForm;
