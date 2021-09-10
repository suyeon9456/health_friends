import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import RangeTimePicker from '../../atoms/RangeTimePicker';
import InputTimePicker from '../../atoms/InputTimePicker';

const FormTimePicker = ({ label, type, placeholder, size, essential }) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    {type === 'range'
      ? <RangeTimePicker size={size} placeholder={placeholder} />
      : <InputTimePicker size={size} placeholder={placeholder} />}
  </div>
);

FormTimePicker.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
  // props: PropTypes.any,
};

export default FormTimePicker;
