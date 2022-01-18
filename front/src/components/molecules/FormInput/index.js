import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Input, ErrorMessage } from '../../atoms';
import { Essential, FormInputWrap, Label } from './style';

const FormInput = ({ label, placeholder, essential, id,
  control, error,
  ...props }) => (
    <FormInputWrap>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      <Controller
        control={control}
        name={id}
        render={({ field: { value, onChange } }) => (
          <Input
            name={id}
            placeholder={placeholder}
            value={value}
            error={error}
            onChange={onChange}
            {...props}
          />
        )}
      />
      {error && (
        <ErrorMessage>{error.message}</ErrorMessage>
      )}
    </FormInputWrap>
);

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  essential: PropTypes.bool,
  id: PropTypes.string,
  control: PropTypes.any,
  error: PropTypes.any,
  props: PropTypes.any,
};

export default FormInput;
