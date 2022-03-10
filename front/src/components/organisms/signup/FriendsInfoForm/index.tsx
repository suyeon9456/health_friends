import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signupSelector, signupStepFriendsInfoSave, signupStepPrev } from '@/../reducers/user';
import { Alert, FormSelect } from '../../../molecules';
import { Form, Button } from '../../../atoms';
import { ButtonWrap, FormWrapper } from './style';
import { AgeOptions, CareerOptions, GenderOptions, RoleOptions, SignupMenu } from '@/../@types/utils';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { SignupInfo, SignupMoreInfo, SignupGymInfo, SignupFriendsInfo } from '@/../@types/user';

const FriendsInfoForm = () => {
  const dispatch = useDispatch();
  const { selectedGym,
    signupStepInfo: info,
    signupStepMoreInfo: moreInfo,
    signupStepGymInfo: gymInfo,
    signupStepFriendsInfo }: {
      selectedGym: {};
      signupStepInfo: SignupInfo;
      signupStepMoreInfo: SignupMoreInfo;
      signupStepGymInfo: SignupGymInfo;
      signupStepFriendsInfo: SignupFriendsInfo;
    } = useSelector(signupSelector);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      friendsGender: signupStepFriendsInfo?.friendsGender || GenderOptions[0].value,
      friendsCareer: signupStepFriendsInfo?.friendsCareer || CareerOptions[0].value,
      friendsAge: signupStepFriendsInfo?.friendsAge || AgeOptions[0].value,
      friendsRole: signupStepFriendsInfo?.friendsRole || RoleOptions[0].value,
    },
  });
  // const [show, setShow] = useState<boolean>(false);

  const mutation = useMutation((data: {
    info: SignupInfo;
    moreInfo: SignupMoreInfo;
    gymInfo: SignupGymInfo;
    selectedGym: {};
    friendsInfo: SignupFriendsInfo;
  }) => axios.post('/user', data), {
    onError: async (error: AxiosError) => {
      console.log('ddd', error?.response);
    },
    onSuccess: () => {
      Router.replace('/');
    }
  });

  const onClickSignup = useCallback(async (data, e) => {
    if (e.nativeEvent.submitter.name === 'next') {
      // await mutation.mutateAsync({
      mutation.mutate({
        info,
        moreInfo,
        gymInfo,
        selectedGym,
        friendsInfo: data,
      }
      );
      return
    }
    dispatch(signupStepFriendsInfoSave(data));
    dispatch(signupStepPrev(SignupMenu.GYMINFO));
  }, [selectedGym, info, moreInfo, gymInfo, mutation]);

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onClickSignup)}>
        <FormSelect
          label="성별"
          id="friendsGender"
          options={GenderOptions}
          size="large"
          control={control}
        />
        <FormSelect
          label="나이"
          id="friendsAge"
          size="large"
          options={AgeOptions}
          control={control}
        />
        <FormSelect
          label="운동경력"
          id="friendsCareer"
          options={CareerOptions}
          size="large"
          control={control}
        />
        <FormSelect
          label="친구와의 역할"
          id="friendsRole"
          options={RoleOptions}
          size="large"
          control={control}
        />
        <ButtonWrap>
          <Button
            type="line-primary"
            size="large"
            name="prev"
            submit
          >
            이전단계
          </Button>
          <Button
            type="line-primary"
            size="large"
            name="next"
            buttonLoading={mutation.isLoading}
            submit
          >
            가입하기
          </Button>
        </ButtonWrap>
      </Form>
      {/* <Alert
        show={show}
        type="warning"
        action={(
          <Button
            type="warning"
            onClick={goMain}
            block
          >
            확인
          </Button>
        )}
        message="로그인 후 사용가능 합니다."
      /> */}
    </FormWrapper>
  );
};

export default FriendsInfoForm;
