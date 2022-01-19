import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { FormRangeTimePicker, FormSelect } from '../../../molecules';
import { FormWrap } from './style';

const EditInfoForm = ({ targetId, control }) => {
  const { careerOptions,
    roleOptions,
    genderOptions,
    ageOptions } = useSelector((state) => state.user);
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

EditInfoForm.propTypes = {
  targetId: PropTypes.string.isRequired,
  control: PropTypes.any,
};

export default EditInfoForm;
