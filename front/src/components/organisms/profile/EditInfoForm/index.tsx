import React from 'react';
import { Control, FieldValues } from 'react-hook-form';

import { FormRangeTimePicker, FormSelect } from '../../../molecules';
import { FormWrap } from './style';
import { AgeOptions, CareerOptions, GenderOptions, RoleOptions } from '@/../@types/utils';

interface EditInfoFormType extends FieldValues {
  startTime: Date;
  endTime: Date;
  gender: string;
  age: number;
  career: number;
  role: number;
}

const EditInfoForm = ({ targetId, control }: {
  targetId: string;
  control: Control<EditInfoFormType, object>;
}) => (
  <FormWrap>
    <FormSelect
      label="연령"
      id="age"
      options={AgeOptions}
      size="small"
      control={control}
    />
    {targetId === 'more-info' && (
      <FormRangeTimePicker
        startName="startTime"
        endName="endTime"
        label="운동시간"
        size="small"
        control={control}
      />
    )}
    <FormSelect
      label="운동경력"
      id="career"
      options={CareerOptions}
      size="small"
      control={control}
    />
    <FormSelect
      label="성별"
      id="gender"
      options={GenderOptions}
      size="small"
      control={control}
    />
    <FormSelect
      label="친구와의 역할"
      id="role"
      options={RoleOptions}
      size="small"
      control={control}
    />
  </FormWrap>
);

export default EditInfoForm;
