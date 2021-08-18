import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../atoms/Input';
import { Essential, Label } from './style';

const FormInput = ({ label, placeholder, size, essential }) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Input placeholder={placeholder} size={size} />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
};

export default FormInput;
