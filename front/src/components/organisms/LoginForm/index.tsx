import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { changeModal, useModalDispatch } from '@/../store/modalStore';
import { loginAPI } from '@/api/user';
import {
  ButtonType,
  GlobalModal,
  InputType,
  ModalStatus,
  SizeType,
} from '@/../@types/constant';

import { FormInput } from '@/components/molecules';
import { Button, Form } from '@/components/atoms';
import { meKey } from '@/../@utils/queryKey';
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
  const queryClient = useQueryClient();
  const loginMutation = useMutation(
    (data: { email: string; password: string }) => loginAPI(data),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(meKey);
        void router.back();
      },
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
    contextDispatch(changeModal({ message: '로그인을 실패하였습니다.' }));
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
            {...{ autoFocus: true }}
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
