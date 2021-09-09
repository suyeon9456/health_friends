import React from 'react';

import { FormWrapper } from './style';
import FormSelect from '../../../molecules/FormSelect';
import FormInputNumber from '../../../molecules/FormInputNumber';

const FriendsInfoForm = () => {
  const genderOptions = [
    { value: 'male', text: '남성' },
    { value: 'female', text: '여성' },
  ];
  const careerOptions = [
    { value: 1, text: '1년 미만' },
    { value: 2, text: '1년 이상 ~ 3년 미만' },
    { value: 3, text: '3년 이상 ~ 5년 미만' },
    { value: 4, text: '5년 이상 ~ 10년 미만' },
    { value: 5, text: '10년 이상' },
  ];
  const roleOptions = [
    { value: 1, text: '도움을 주고 싶어요!' },
    { value: 2, text: '도움을 받고 싶어요!' },
    { value: 3, text: '함께 운동하고 싶어요!' },
  ];
  return (
    <FormWrapper>
      <FormSelect
        label="성별"
        options={genderOptions}
        size="large"
      />
      <FormInputNumber
        label="나이"
        size="large"
        placeholder="나이(숫자만)를 입력해주세요."
      />
      <FormSelect
        label="운동경력"
        options={careerOptions}
        size="large"
      />
      <FormSelect
        label="친구와의 역할"
        options={roleOptions}
        size="large"
      />
    </FormWrapper>
  );
};

export default FriendsInfoForm;
