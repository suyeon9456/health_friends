import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../atoms/Input';
import { Essential, Label } from './style';

const FormInput = ({
  label,
  placeholder,
  size,
  essential,
  validationState,
  feedback,
  ...props }) => (
    <div>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      <Input
        placeholder={placeholder}
        size={size}
        validationState={validationState}
        feedback={feedback}
        {...props}
      />
    </div>
);

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
  validationState: PropTypes.bool,
  feedback: PropTypes.string,
  props: PropTypes.any,
};

export default FormInput;
