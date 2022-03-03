import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { optionsSelector, signupRequest, signupSelector, signupStepFriendsInfoSave, signupStepPrev } from '@/../reducers/user';
import { FormSelect } from '../../../molecules';
import { Form, Button } from '../../../atoms';
import { ButtonWrap, FormWrapper } from './style';

const FriendsInfoForm = () => {
  const dispatch = useDispatch();
  const { genderOptions,
    careerOptions,
    roleOptions,
    ageOptions } = useSelector(optionsSelector);
  const { signupDone,
    selectedGym,
    signupStepInfo: info,
    signupStepMoreInfo: moreInfo,
    signupStepGymInfo: gymInfo,
    signupStepFriendsInfo } = useSelector(signupSelector);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      friendsGender: signupStepFriendsInfo?.friendsGender || 'male',
      friendsCareer: signupStepFriendsInfo?.friendsCareer || 1,
      friendsAge: signupStepFriendsInfo?.friendsAge || 0,
      friendsRole: signupStepFriendsInfo?.friendsRole || 1,
    },
  });

  const onClickSignup = useCallback((data, e) => {
    if (e.nativeEvent.submitter.name === 'next') {
      return dispatch(signupRequest({
        info,
        moreInfo,
        gymInfo,
        selectedGym,
        friendsInfo: { ...data },
      }));
    }
    dispatch(signupStepFriendsInfoSave(data));
    dispatch(signupStepPrev());
  }, [selectedGym, info, moreInfo, gymInfo]);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onClickSignup)}>
        <FormSelect
          label="성별"
          id="friendsGender"
          options={genderOptions}
          size="large"
          control={control}
        />
        <FormSelect
          label="나이"
          id="friendsAge"
          size="large"
          options={ageOptions}
          control={control}
        />
        <FormSelect
          label="운동경력"
          id="friendsCareer"
          options={careerOptions}
          size="large"
          control={control}
        />
        <FormSelect
          label="친구와의 역할"
          id="friendsRole"
          options={roleOptions}
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
