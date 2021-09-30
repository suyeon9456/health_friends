import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import Textarea from '../../atoms/Textarea';

const FormTextarea = ({
  label,
  placeholder,
  maxLength,
  showCount = false,
  essential = false,
  value,
  onChange,
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Textarea
      placeholder={placeholder}
      maxLength={maxLength}
      showCount={showCount}
      value={value}
      onChange={onChange}
    />
  </div>
);

FormTextarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  essential: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormTextarea;
