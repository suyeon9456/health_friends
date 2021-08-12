import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import Input from '../../atoms/Input';

const FormTextarea = ({
  label,
  placeholder,
  maxLength,
  showCount = false,
  essential = false,
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Input
      type="textarea"
      placeholder={placeholder}
      maxLength={maxLength}
      showCount={showCount}
      essential={essential}
    />
  </div>
);

FormTextarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  essential: PropTypes.bool,
};

export default FormTextarea;
