import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginRequest, loginSelector } from '@/../reducers/user';
import { FormInput } from '@/components/molecules';
import { Button, Form } from '@/components/atoms';
import { ButtonWrapper, FormWrapper, InputWrapper } from './style';
import { useModalDispatch, useModalState } from '@/../store/modalStore';
import { GlobalModal, ModalStatus } from '@/../@types/utils';

const schema = yup.object({
  email: yup.string()
    .email('email 형식이 아닙니다.')
    .required('email은 필수 항목입니다.'),
  password: yup.string().required('비밀번호는 필수 항목입니다.'),
}).required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();

  const { loginError } = useSelector(loginSelector);
  const modals = useModalState();

  const { handleSubmit, control, formState: { errors } } = useForm<{ email: string; password: string }>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const changeShowAlert = useCallback(() => {
    contextDispatch({
      type: 'SHOW_MODAL',
      payload: {
        type: GlobalModal.ALERT,
        statusType: ModalStatus.ERROR,
        message: '로그인을 실패하였습니다.',
        block: true,
      },
    });
  }, [modals]);

  const onLogin = useCallback((data, e) => {
    e.preventDefault();
    dispatch(loginRequest(data));
  }, []);

  useEffect(() => {
    if (loginError) {
      changeShowAlert();
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
            <Link href="/" passHref>
              <a>아이디 찾기</a>
            </Link>
          </Button>
          <Button>
            <Link href="/" passHref>
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
      {/* <Alert
        show={alertShow}
        type="error"
        action={(
          <Button
            type="error"
            onClick={changeShowAlert}
            block
          >
            확인
          </Button>
        )}
        message="로그인을 실패하였습니다."
      /> */}
    </FormWrapper>
  );
};

export default LoginForm;
