import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { SIGN_UP_STEP_MORE_INFO_SAVE, SIGN_UP_STEP_NEXT, SIGN_UP_STEP_PREV } from '../../../../../reducers/user';

import { Button, Form } from '../../../atoms';
import { FormSelect } from '../../../molecules';
import { ButtonWrap, MoreInfoFormWrapper } from './style';

const MoreInfoForm = () => {
  const dispatch = useDispatch();

  const { careerOptions, roleOptions, signupStepMoreInfo,
    genderOptions, ageOptions } = useSelector((state) => state.user);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      gender: signupStepMoreInfo?.gender || 'male',
      age: signupStepMoreInfo?.age || 0,
      career: signupStepMoreInfo?.career || 1,
      role: signupStepMoreInfo?.role || 1,
    },
  });

  const onClickStepHandler = useCallback((data, e) => {
    dispatch({ type: SIGN_UP_STEP_MORE_INFO_SAVE, data });
    if (e.nativeEvent.submitter.name === 'next') {
      dispatch({ type: SIGN_UP_STEP_NEXT });
    } else {
      dispatch({ type: SIGN_UP_STEP_PREV });
    }
  }, []);

  return (
    <MoreInfoFormWrapper>
      <Form onSubmit={handleSubmit(onClickStepHandler)}>
        <FormSelect
          label="성별"
          id="gender"
          options={genderOptions}
          size="large"
          control={control}
        />
        <FormSelect
          label="나이"
          id="age"
          size="large"
          options={ageOptions}
          control={control}
        />
        <FormSelect
          label="운동경력"
          id="career"
          options={careerOptions}
          size="large"
          control={control}
        />
        <FormSelect
          label="친구와의 역할"
          id="role"
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
            다음단계
          </Button>
        </ButtonWrap>
      </Form>
    </MoreInfoFormWrapper>
  );
};

export default MoreInfoForm;
