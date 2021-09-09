import React from 'react';

import { FormWrapper } from './style';
import FormInput from '../../../molecules/FormInput';
import FormTextarea from '../../../molecules/FormTextarea';

const MoreGymInfoForm = () => {
  console.log('test');
  return (
    <FormWrapper>
      <FormInput
        label="운동시간"
        placeholder="운동시간을 입력해주세요."
        size="large"
      />
      <FormInput
        label="헬스장"
        placeholder="헬스장 주소를 찾아 입력해주세요."
        size="large"
      />
      <FormTextarea
        label="간단 소개"
        placeholder="내용을 입력해주세요."
        maxLength={50}
        showCount
        essential
      />
    </FormWrapper>
  );
};

export default MoreGymInfoForm;
