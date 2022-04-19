import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  signupSelector,
  signupStepInfoSave,
  signupStepNext,
} from '@/../reducers/user';
import { ButtonType, InputType, SignupMenu, SizeType } from '@/../@types/utils';
import { FormInput } from '../../../molecules';
import { Button, Form } from '../../../atoms';
import { ButtonWrap, InfoFormWrapper } from './style';

const schema = yup
  .object({
    email: yup
      .string()
      .email('email일 형식이 아닙니다.')
      .required('email은 필수 항목입니다.'),
    password: yup
      .string()
      .max(15, '비밀번호는 15자리 이하여야 합니다.')
      .min(10, '비밀번호는 10자리 이상이어야 합니다.')
      .required('비밀번호는 필수 항목입니다.'),
    checkPassword: yup
      .string()
      .required('비밀번호 확인은 필수 항목입니다.')
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
    nickname: yup.string().required('닉네임은 필수 항목입니다.'),
  })
  .required();

const InfoForm = () => {
  const dispatch = useDispatch();

  const { signupStepInfo } = useSelector(signupSelector);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: signupStepInfo?.email || '',
      password: '',
      checkPassword: '',
      nickname: signupStepInfo?.nickname || '',
    },
    resolver: yupResolver(schema),
  });

  const onNextClick = useCallback((data) => {
    dispatch(signupStepInfoSave(data));
    dispatch(signupStepNext(SignupMenu.MOREINFO));
  }, []);

  return (
    <InfoFormWrapper>
      <Form onSubmit={handleSubmit(onNextClick)}>
        <FormInput
          size={SizeType.LARGE}
          id="email"
          label="E-mail"
          placeholder="email을 입력해주세요."
          essential
          control={control}
          error={errors.email}
        />
        <FormInput
          size={SizeType.LARGE}
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type={InputType.PASSWORD}
          essential
          control={control}
          error={errors.password}
        />
        <FormInput
          size={SizeType.LARGE}
          id="checkPassword"
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요."
          type={InputType.PASSWORD}
          essential
          control={control}
          error={errors.checkPassword}
        />
        <FormInput
          size={SizeType.LARGE}
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          essential
          control={control}
          error={errors.nickname}
        />
        <ButtonWrap>
          <Button type={ButtonType.LINEPRIMARY} size={SizeType.LARGE} submit>
            다음단계
          </Button>
        </ButtonWrap>
      </Form>
    </InfoFormWrapper>
  );
};

export default InfoForm;
