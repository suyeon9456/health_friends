import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ButtonWrapper, FormWrapper, InputWrapper } from './style';
import Input from '../../atoms/Input';
import useInput from '../../../hooks/useInput';
import Button from '../../atoms/Button';
import { loginAction } from '../../../../reducers/user';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onLogin = useCallback((data) => {
    // e.preventDefault();
    console.log('data', data);
    dispatch(loginAction({ email: data.email, password: data.password }));
  }, [email, password]);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onLogin)}>
        <InputWrapper>
          <Input
            id="user-id"
            value={email}
            onChange={onChangeEmail}
            size="large"
            placeholder="이메일 계정을 입력해주세요."
            {...register('email', { required: true })}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            id="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            size="large"
            placeholder="비밀번호를 입력해주세요."
            {...register('password', { required: true })}
          />
        </InputWrapper>
        <Button type="primary" block submit>로그인</Button>
      </form>
      <ButtonWrapper>
        <div>
          <Button>
            <Link href="/">
              <a>
                아이디 찾기
              </a>
            </Link>
          </Button>
          <Button>
            <Link href="/">
              <a>
                비밀번호 찾기
              </a>
            </Link>
          </Button>
        </div>
        <Button type="line-primary" block>
          <Link href="/signup">
            <a className="line-primary">
              회원가입
            </a>
          </Link>
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
