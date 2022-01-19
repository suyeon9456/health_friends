import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { FormSelectWrap, Essential, Label } from './style';
import { Select, ErrorMessage } from '../../atoms';

const FormSelect = ({ size, label, options, id,
  essential, control, error }) => (
    <FormSelectWrap size={size}>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      <Controller
        control={control}
        name={id}
        render={({ field: { value, onChange } }) => {
          console.log('?', value);
          return (
            <Select
              name={id}
              value={value}
              error={error}
              onChange={onChange}
              size={size}
              options={options}
            />
          );
        }}
      />
      {error && (
        <ErrorMessage>{error.message}</ErrorMessage>
      )}
    </FormSelectWrap>
);

FormSelect.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  essential: PropTypes.bool,
  id: PropTypes.string,
  control: PropTypes.any,
  error: PropTypes.any,
};

export default FormSelect;
