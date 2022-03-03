import React from 'react';
import { useSelector } from 'react-redux';
import { Control, FieldValues } from 'react-hook-form';

import { optionsSelector } from '@/../reducers/user';
import { FormRangeTimePicker, FormSelect } from '../../../molecules';
import { FormWrap } from './style';

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
}) => {
  const { careerOptions,
    roleOptions,
    genderOptions,
    ageOptions } = useSelector(optionsSelector);
  return (
    <FormWrap>
      <FormSelect
        label="연령"
        id="age"
        options={ageOptions}
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
        options={careerOptions}
        size="small"
        control={control}
      />
      <FormSelect
        label="성별"
        id="gender"
        options={genderOptions}
        size="small"
        control={control}
      />
      <FormSelect
        label="친구와의 역할"
        id="role"
        options={roleOptions}
        size="small"
        control={control}
      />
    </FormWrap>
  );
};

export default EditInfoForm;
