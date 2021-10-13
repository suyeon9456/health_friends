import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import RangePicker from '../../atoms/RangePicker';
import InputDatePicker from '../../atoms/InputDatePicker';

const FormDatePicker = ({ label, type, placeholder, size, essential, startDate, setStartDate }) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    {type === 'range'
      ? <RangePicker size={size} placeholder={placeholder} />
      : (
        <InputDatePicker
          size={size}
          placeholder={placeholder}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      )}
  </div>
);

FormDatePicker.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
  startDate: PropTypes.node.isRequired,
  setStartDate: PropTypes.func.isRequired,
};

export default FormDatePicker;
