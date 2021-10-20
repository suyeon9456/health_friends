import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { FormSelect, FormTimePicker } from '../../../molecules';
import { FormWrap } from './style';

const EditInfoForm = ({
  targetId,
  age,
  onChangeAge,
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  career,
  onChangeCareer,
  gender,
  onChangeGender,
  role,
  onChangeRole,
}) => {
  const { careerOptions,
    roleOptions,
    genderOptions,
    ageOptions } = useSelector((state) => state.user);
  return (
    <FormWrap>
      <FormSelect
        label="연령"
        options={ageOptions}
        size="small"
        value={age}
        onChange={onChangeAge}
      />
      {targetId === 'more-info' && (
        <FormTimePicker
          label="운동시간"
          type="range"
          size="small"
          startDate={startDate}
          onChangeStartDate={onChangeStartDate}
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
        />
      )}
      <FormSelect
        label="운동경력"
        options={careerOptions}
        size="small"
        value={career}
        onChange={onChangeCareer}
      />
      <FormSelect
        label="성별"
        options={genderOptions}
        size="small"
        value={gender}
        onChange={onChangeGender}
      />
      <FormSelect
        label="친구와의 역할"
        options={roleOptions}
        size="small"
        value={role}
        onChange={onChangeRole}
      />
    </FormWrap>
  );
};

EditInfoForm.propTypes = {
  targetId: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  onChangeAge: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  onChangeStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  onChangeEndDate: PropTypes.func.isRequired,
  career: PropTypes.number.isRequired,
  onChangeCareer: PropTypes.func.isRequired,
  gender: PropTypes.number.isRequired,
  onChangeGender: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  onChangeRole: PropTypes.func.isRequired,
};

export default EditInfoForm;
