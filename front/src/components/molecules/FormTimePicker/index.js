import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Essential, Label } from './style';
import { InputTimePicker } from '../../atoms';

const FormTimePicker = ({ label, id, control, error, size, essential }) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Controller
      control={control}
      name={id}
      render={({ field: { value, onChange } }) => (
        <InputTimePicker
          name={id}
          size={size}
          value={value}
          error={error}
          onChange={onChange}
        />
      )}
    />
  </div>
);

FormTimePicker.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  control: PropTypes.any,
  error: PropTypes.any,
  size: PropTypes.string,
  essential: PropTypes.bool,
};

export default FormTimePicker;
