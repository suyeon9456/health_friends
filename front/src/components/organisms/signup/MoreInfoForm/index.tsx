import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  signupSelector,
  signupStepMoreInfoSave,
  signupStepNext,
  signupStepPrev,
} from '@/../reducers/user';
import {
  AgeOptions,
  ButtonType,
  CareerOptions,
  GenderOptions,
  RoleOptions,
  SignupMenu,
  SizeType,
} from '@/../@types/constant';
import { FormSelect } from '../../../molecules';
import { Button, Form } from '../../../atoms';
import { ButtonWrap, MoreInfoFormWrapper } from './style';

const MoreInfoForm = () => {
  const dispatch = useDispatch();
  const { signupStepMoreInfo } = useSelector(signupSelector);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      gender: signupStepMoreInfo?.gender || GenderOptions[0].value,
      age: signupStepMoreInfo?.age || AgeOptions[0].value,
      career: signupStepMoreInfo?.career || CareerOptions[0].value,
      role: signupStepMoreInfo?.role || RoleOptions[0].value,
    },
  });

  const onClickStepHandler = useCallback((data, e) => {
    dispatch(signupStepMoreInfoSave(data));
    if (e.nativeEvent.submitter.name === 'next') {
      dispatch(signupStepNext(SignupMenu.GYMINFO));
    } else {
      dispatch(signupStepPrev(SignupMenu.INFO));
    }
  }, []);

  return (
    <MoreInfoFormWrapper>
      <Form onSubmit={handleSubmit(onClickStepHandler)}>
        <FormSelect
          label="성별"
          id="gender"
          options={GenderOptions}
          size={SizeType.LARGE}
          control={control}
        />
        <FormSelect
          label="나이"
          id="age"
          size={SizeType.LARGE}
          options={AgeOptions}
          control={control}
        />
        <FormSelect
          label="운동경력"
          id="career"
          options={CareerOptions}
          size={SizeType.LARGE}
          control={control}
        />
        <FormSelect
          label="친구와의 역할"
          id="role"
          options={RoleOptions}
          size={SizeType.LARGE}
          control={control}
        />
        <ButtonWrap>
          <Button
            type={ButtonType.LINEPRIMARY}
            size={SizeType.LARGE}
            name="prev"
            submit
          >
            이전단계
          </Button>
          <Button
            type={ButtonType.LINEPRIMARY}
            size={SizeType.LARGE}
            name="next"
            submit
          >
            다음단계
          </Button>
        </ButtonWrap>
      </Form>
    </MoreInfoFormWrapper>
  );
};

export default MoreInfoForm;
