import React from 'react';

import { MoreInfoFormWrapper } from './style';
import FormInput from '../../../molecules/FormInput';
import FormSelect from '../../../molecules/FormSelect';
import FormInputNumber from '../../../molecules/FormInputNumber';

const MoreInfoForm = () => {
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
    <MoreInfoFormWrapper>
      <FormInput
        label="성별"
        placeholder="성별을 입력해주세요."
        size="large"
      />
      <FormInputNumber
        label="나이"
        placeholder="나이(숫자만)를 입력해주세요."
        size="large"
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
    </MoreInfoFormWrapper>
  );
};

export default MoreInfoForm;
