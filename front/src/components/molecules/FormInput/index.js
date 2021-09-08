import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../atoms/Input';
import { Essential, Label } from './style';

const FormInput = ({ label, placeholder, size, essential, ...props }) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Input placeholder={placeholder} size={size} {...props} />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
  props: PropTypes.any,
};

export default FormInput;
