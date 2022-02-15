import React from 'react';
import { Controller } from 'react-hook-form';

import { FormSelectWrap, Essential, Label } from './style';
import { Select, ErrorMessage } from '../../atoms';

const FormSelect = ({
  size,
  label,
  options,
  id,
  essential,
  control,
  error }: {
    label: string;
    size?: string;
    options: Array<{ text: string; value: string | number }>;
    error?: any;
    id: string;
    essential?: boolean;
    control: any;
  }) => (
    <FormSelectWrap size={size}>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      <Controller
        control={control}
        name={id}
        render={({ field: { value, onChange } }) => {
          return (
            <Select
              name={id}
              value={value}
              // error={error}
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

export default FormSelect;
