import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SIGN_UP_STEP_INFO_SAVE, SIGN_UP_STEP_NEXT } from '../../../../../reducers/user';

import { Button, Form } from '../../../atoms';
import { FormInput } from '../../../molecules';
import { ButtonWrap, InfoFormWrapper } from './style';
import { RootState } from '@/../store/configureStore';

const schema = yup.object({
  email: yup.string()
    .email('email일 형식이 아닙니다.')
    .required('email은 필수 항목입니다.'),
  password: yup.string()
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(10, '비밀번호는 10자리 이상이어야 합니다.')
    .required('비밀번호는 필수 항목입니다.'),
  checkPassword: yup.string()
    .required('비밀번호 확인은 필수 항목입니다.')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
  nickname: yup.string()
    .required('닉네임은 필수 항목입니다.'),
}).required();

const InfoForm = () => {
  const dispatch = useDispatch();

  const { signupStepInfo } = useSelector((state: RootState) => state.user);
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: signupStepInfo?.email || '',
      password: '',
      checkPassword: '',
      nickname: signupStepInfo?.nickname || '',
    },
    resolver: yupResolver(schema),
  });

  const onNextClick = useCallback((data) => {
    dispatch({
      type: SIGN_UP_STEP_INFO_SAVE,
      data,
    });
    dispatch({ type: SIGN_UP_STEP_NEXT });
  }, []);

  return (
    <InfoFormWrapper>
      <Form onSubmit={handleSubmit(onNextClick)}>
        <FormInput
          size="large"
          id="email"
          label="E-mail"
          placeholder="email을 입력해주세요."
          essential
          control={control}
          error={errors.email}
        />
        <FormInput
          size="large"
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          essential
          control={control}
          error={errors.password}
        />
        <FormInput
          size="large"
          id="checkPassword"
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요."
          type="password"
          essential
          control={control}
          error={errors.checkPassword}
        />
        <FormInput
          size="large"
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          essential
          control={control}
          error={errors.nickname}
        />
        <ButtonWrap>
          <Button
            type="line-primary"
            size="large"
            submit
          >
            다음단계
          </Button>
        </ButtonWrap>
      </Form>
    </InfoFormWrapper>
  );
};

export default InfoForm;
