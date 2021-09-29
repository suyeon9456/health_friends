import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import InputNumber from '../../atoms/InputNumber';

const FormInputNumber = ({ label,
  value,
  onChange,
  setValue,
  size,
  placeholder,
  essential,
  ...props
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <InputNumber
      placeholder={placeholder}
      size={size}
      {...props}
      value={value}
      onChange={onChange}
      setValue={setValue}
    />
  </div>
);

FormInputNumber.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  essential: PropTypes.bool,
  props: PropTypes.node,
};

export default FormInputNumber;
