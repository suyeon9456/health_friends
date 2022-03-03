import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { optionsSelector, signupSelector, signupStepMoreInfoSave, signupStepNext, signupStepPrev } from '@/../reducers/user';
import { FormSelect } from '../../../molecules';
import { Button, Form } from '../../../atoms';
import { ButtonWrap, MoreInfoFormWrapper } from './style';

const MoreInfoForm = () => {
  const dispatch = useDispatch();

  const { careerOptions,
    roleOptions,
    genderOptions,
    ageOptions } = useSelector(optionsSelector);
  const { signupStepMoreInfo } = useSelector(signupSelector);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      gender: signupStepMoreInfo?.gender || 'male',
      age: signupStepMoreInfo?.age || 0,
      career: signupStepMoreInfo?.career || 1,
      role: signupStepMoreInfo?.role || 1,
    },
  });

  const onClickStepHandler = useCallback((data, e) => {
    dispatch(signupStepMoreInfoSave(data));
    if (e.nativeEvent.submitter.name === 'next') {
      dispatch(signupStepNext());
    } else {
      dispatch(signupStepPrev());
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
