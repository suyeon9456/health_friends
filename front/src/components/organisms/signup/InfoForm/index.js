import React from 'react';

import FormInput from '../../../molecules/FormInput';
import { InfoFormWrapper } from './style';

const InfoForm = () => (
  <InfoFormWrapper>
    <FormInput
      label="E-mail"
      placeholder="email을 입력해주세요."
      essential
    />
    <FormInput
      label="비밀번호"
      placeholder="비밀번호를 입력해주세요."
      type="password"
      essential
    />
    <FormInput
      label="비밀번호 확인"
      placeholder="비밀번호 확인을 입력해주세요."
      type="password"
      essential
    />
    <FormInput
      label="닉네임"
      placeholder="닉네임을 입력해주세요."
      essential
    />
  </InfoFormWrapper>
);

export default InfoForm;
