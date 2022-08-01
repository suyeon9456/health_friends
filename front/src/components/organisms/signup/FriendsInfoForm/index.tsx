import React, { useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import {
  signupSelector,
  signupStepFriendsInfoSave,
  signupStepPrev,
} from '@/../reducers/user';
import {
  AgeOptions,
  ButtonType,
  CareerOptions,
  GenderOptions,
  ModalStatus,
  RoleOptions,
  SignupMenu,
  SizeType,
} from '@/../@types/constant';
import { AxiosError } from 'axios';
import { SignupSteps, SignupMutationSteps } from '@/../@types/user';
import { changeModal, useModalDispatch } from '@/../store/modalStore';
import { signupAPI } from '@/api/user';
import { ButtonWrap, FormWrapper } from './style';
import { Form, Button } from '../../../atoms';
import { FormSelect } from '../../../molecules';

const FriendsInfoForm = () => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const {
    selectedGym,
    signupStepInfo: info,
    signupStepMoreInfo: moreInfo,
    signupStepGymInfo: gymInfo,
    signupStepFriendsInfo,
  }: SignupSteps = useSelector(signupSelector);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      friendsGender:
        signupStepFriendsInfo?.friendsGender ?? GenderOptions[0].value,
      friendsCareer:
        signupStepFriendsInfo?.friendsCareer ?? CareerOptions[0].value,
      friendsAge: signupStepFriendsInfo?.friendsAge ?? AgeOptions[0].value,
      friendsRole: signupStepFriendsInfo?.friendsRole ?? RoleOptions[0].value,
    },
  });

  const mutation = useMutation((data: SignupMutationSteps) => signupAPI(data), {
    onError: async (error: AxiosError) => {
      contextDispatch(
        changeModal({
          message: error.response?.data,
        })
      );
    },
    onSuccess: () => {
      void Router.replace('/');
      contextDispatch(
        changeModal({
          status: ModalStatus.SUCCESS,
          message: '회원가입이 완료되었습니다.',
        })
      );
    },
  });

  const onClickSignup = useCallback(
    async (data, e) => {
      if (e.nativeEvent.submitter.name === 'next') {
        mutation.mutate({
          info,
          moreInfo,
          gymInfo,
          selectedGym,
          friendsInfo: data,
        });
        return;
      }
      dispatch(signupStepFriendsInfoSave(data));
      dispatch(signupStepPrev(SignupMenu.GYMINFO));
    },
    [selectedGym, info, moreInfo, gymInfo, mutation]
  );

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onClickSignup)}>
        <FormSelect
          label="성별"
          id="friendsGender"
          options={GenderOptions}
          size={SizeType.LARGE}
          control={control}
        />
        <FormSelect
          label="나이"
          id="friendsAge"
          size={SizeType.LARGE}
          options={AgeOptions}
          control={control}
        />
        <FormSelect
          label="운동경력"
          id="friendsCareer"
          options={CareerOptions}
          size={SizeType.LARGE}
          control={control}
        />
        <FormSelect
          label="친구와의 역할"
          id="friendsRole"
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
            buttonLoading={mutation.isLoading}
            submit
          >
            가입하기
          </Button>
        </ButtonWrap>
      </Form>
    </FormWrapper>
  );
};

export default FriendsInfoForm;
