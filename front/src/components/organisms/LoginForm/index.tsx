import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useModalDispatch } from '@/../store/modalStore';
import { loginAPI } from '@/api/user';
import {
  ButtonType,
  GlobalModal,
  InputType,
  ModalStatus,
  SizeType,
} from '@/../@types/utils';

import { FormInput } from '@/components/molecules';
import { Button, Form } from '@/components/atoms';
import { ButtonWrapper, FormWrapper, InputWrapper } from './style';

const schema = yup
  .object({
    email: yup
      .string()
      .email('email 형식이 아닙니다.')
      .required('email은 필수 항목입니다.'),
    password: yup.string().required('비밀번호는 필수 항목입니다.'),
  })
  .required();

const LoginForm = () => {
  const router = useRouter();
  const contextDispatch = useModalDispatch();

  const loginMutation = useMutation(
    (data: { email: string; password: string }) => loginAPI(data),
    {
      onSuccess: () => router.push('/'),
      onError: () => changeShowAlert(),
    }
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
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
  }, []);

  const onLogin = useCallback((data, e) => {
    e.preventDefault();
    loginMutation.mutate(data);
  }, []);

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onLogin)}>
        <InputWrapper>
          <FormInput
            id="email"
            size={SizeType.LARGE}
            placeholder="이메일 계정을 입력해주세요."
            control={control}
            error={errors.email}
          />
        </InputWrapper>
        <InputWrapper>
          <FormInput
            id="password"
            type={InputType.PASSWORD}
            size={SizeType.LARGE}
            placeholder="비밀번호를 입력해주세요."
            control={control}
            error={errors.password}
          />
        </InputWrapper>
        <Button
          type={ButtonType.PRIMARY}
          block
          submit
          buttonLoading={loginMutation.isLoading}
        >
          로그인
        </Button>
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
        <Button type={ButtonType.LINEPRIMARY} block>
          <Link href="/signup">
            <a className="line-primary">회원가입</a>
          </Link>
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
