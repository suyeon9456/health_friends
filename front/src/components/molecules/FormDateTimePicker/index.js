import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import RangeDateTimePicker from '../../atoms/RangeDateTimePicker';

const FormDateTimePicker = ({ label,
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
      <RangeDateTimePicker
        size={size}
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
      />
    </div>
);

FormDateTimePicker.propTypes = {
  label: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  onChangeStartDate: PropTypes.func,
  endDate: PropTypes.instanceOf(Date).isRequired,
  onChangeEndDate: PropTypes.func,
  size: PropTypes.string,
  essential: PropTypes.bool,
};

export default FormDateTimePicker;
