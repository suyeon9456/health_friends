import React from 'react';

import {
  AgeOptions,
  BaseSizeType,
  CareerOptions,
  GenderOptions,
  InfoContent,
  RoleOptions,
  SizeType,
} from '@/../@types/constant';
import { EditProfileProps } from '@/../@types/user';
import { FormRangeTimePicker, FormSelect } from '../../../molecules';
import { FormWrap } from './style';

const EditInfoForm = ({ type, control }: EditProfileProps) => (
  <FormWrap>
    <FormSelect
      label="연령"
      id="age"
      options={AgeOptions}
      size={SizeType.SMALL}
      control={control}
    />
    {type === InfoContent.MORE && (
      <FormRangeTimePicker
        startName="startTime"
        endName="endTime"
        label="운동시간"
        size={BaseSizeType.SMALL}
        control={control}
      />
    )}
    <FormSelect
      label="운동경력"
      id="career"
      options={CareerOptions}
      size={SizeType.SMALL}
      control={control}
    />
    <FormSelect
      label="성별"
      id="gender"
      options={GenderOptions}
      size={SizeType.SMALL}
      control={control}
    />
    <FormSelect
      label="친구와의 역할"
      id="role"
      options={RoleOptions}
      size={SizeType.SMALL}
      control={control}
    />
  </FormWrap>
);

export default EditInfoForm;
