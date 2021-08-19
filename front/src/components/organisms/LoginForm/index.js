import React, { useCallback } from 'react';
import Link from 'next/link';

import { ButtonWrapper, FormWrapper, InputWrapper } from './style';
import Input from '../../atoms/Input';
import useInput from '../../../hooks/useInput';
import Button from '../../atoms/Button';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onLogin = useCallback(() => {
    // dispatch(loginAction({ email: userEmail, password: userPassword }));
  }, []);

  return (
    <FormWrapper>
      <form onSubmit={onLogin}>
        <InputWrapper>
          <Input
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일 계정을 입력해주세요."
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요."
          />
        </InputWrapper>
      </form>
      <ButtonWrapper>
        <Link href="/">
          <Button type="primary" block>로그인</Button>
        </Link>
        <div>
          <Link href="/">
            <Button>아이디 찾기</Button>
          </Link>
          <Link href="/">
            <Button>비밀번호 찾기</Button>
          </Link>
        </div>
        <Link href="/">
          <Button type="line-primary" block>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
