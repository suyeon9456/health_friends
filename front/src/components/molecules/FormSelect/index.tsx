import React from 'react';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

import { FormSelectWrap, Essential, Label } from './style';
import { Select, ErrorMessage } from '../../atoms';

interface FormSelectType<T> {
  label: string;
  size?: 'default' | 'small' | 'large';
  options: Array<{ text: string; value: string | number }>;
  error?: FieldError | undefined;
  id: Path<T>;
  essential?: boolean;
  control: Control<T, object>;
}

const FormSelect = <T extends FieldValues>({
  size,
  label,
  options,
  id,
  essential,
  control,
  error }: FormSelectType<T>) => (
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
