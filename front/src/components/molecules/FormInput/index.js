import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../atoms/Input';
import { Essential, Label } from './style';

const FormInput = ({
  label,
  placeholder,
  size,
  essential,
  // validationErrors,
  // feedback,
  id,
  // register,
  // required,
  ...props }) => (
    <div>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      <Input
        placeholder={placeholder}
        size={size}
        // validationErrors={validationErrors}
        // feedback={feedback}
        // {...register(id, { required })}
        {...props}
      />
    </div>
);

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
  // validationErrors: PropTypes.node,
  // feedback: PropTypes.string,
  props: PropTypes.any,
  id: PropTypes.string,
  // required: PropTypes.bool,
  // register: PropTypes.any,
};

export default FormInput;
