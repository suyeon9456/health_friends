import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { LOG_IN_REQUEST } from '../../../../reducers/user';
import { Button, Form } from '../../atoms';
import { ButtonWrapper, FormWrapper, InputWrapper } from './style';
import { Alert, FormInput } from '../../molecules';

const schema = yup.object({
  email: yup.string()
    .email('email 형식이 아닙니다.')
    .required('email은 필수 항목입니다.'),
  password: yup.string()
    .required('비밀번호는 필수 항목입니다.'),
}).required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginError } = useSelector((state) => state.user);
  const [loginErrorAlert, setLoginErrorAlert] = useState(loginError);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onLogin = useCallback((data, e) => {
    e.preventDefault();
    dispatch({ type: LOG_IN_REQUEST, data });
  }, []);

  const onChangeLoginErrorAlert = useCallback(() => {
    setLoginErrorAlert(false);
  }, []);

  useEffect(() => {
    if (loginError) {
      setLoginErrorAlert(true);
    }
  }, [loginError]);

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onLogin)}>
        <InputWrapper>
          <FormInput
            id="email"
            size="large"
            placeholder="이메일 계정을 입력해주세요."
            control={control}
            error={errors.email}
          />
        </InputWrapper>
        <InputWrapper>
          <FormInput
            id="password"
            type="password"
            size="large"
            placeholder="비밀번호를 입력해주세요."
            control={control}
            error={errors.password}
          />
        </InputWrapper>
        <Button type="primary" block submit>로그인</Button>
      </Form>
      <ButtonWrapper>
        <div>
          <Button>
            <Link href="/">
              <a>아이디 찾기</a>
            </Link>
          </Button>
          <Button>
            <Link href="/">
              <a>비밀번호 찾기</a>
            </Link>
          </Button>
        </div>
        <Button type="line-primary" block>
          <Link href="/signup">
            <a className="line-primary">회원가입</a>
          </Link>
        </Button>
      </ButtonWrapper>
      <Alert
        show={loginErrorAlert}
        type="error"
        action={(
          <Button
            type="error"
            onClick={onChangeLoginErrorAlert}
            block
          >
            확인
          </Button>
        )}
        message="로그인을 실패하였습니다."
      />
    </FormWrapper>
  );
};

export default LoginForm;
