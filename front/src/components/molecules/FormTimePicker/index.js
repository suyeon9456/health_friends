import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import RangeTimePicker from '../../atoms/RangeTimePicker';
import InputTimePicker from '../../atoms/InputTimePicker';

const FormTimePicker = ({ label,
  type,
  value,
  onChange,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  size,
  essential }) => (
    <div>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      {type === 'range'
        ? (
          <RangeTimePicker
            size={size}
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
          />
        )
        : (
          <InputTimePicker
            size={size}
            value={value}
            onChange={onChange}
          />
        )}
    </div>
);

FormTimePicker.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  startDate: PropTypes.any,
  onChangeStartDate: PropTypes.func,
  endDate: PropTypes.any,
  onChangeEndDate: PropTypes.func,
  size: PropTypes.string,
  essential: PropTypes.bool,
};

export default FormTimePicker;
