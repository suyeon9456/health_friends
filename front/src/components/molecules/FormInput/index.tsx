import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';

import { ErrorMessage, Icon, Input } from '@/components/atoms';
import { FormInputProps } from '@/../@types/molecules';
import { Essential, Label } from './style';

const FormInput = <T extends FieldValues>({
  label,
  id,
  size,
  type,
  placeholder,
  essential,
  control,
  error,
  disabled,
  ...props
}: FormInputProps<T>) => (
  <div>
    {label && (
      <Label htmlFor={id}>
        {label}
        {essential && <Essential />}
      </Label>
    )}
    <Controller
      control={control}
      name={id}
      render={({ field }) => {
        return (
          <Input
            type={type}
            name={id}
            size={size}
            placeholder={placeholder}
            value={field.value}
            error={error}
            onChange={field.onChange}
            disabled={disabled}
            {...props}
          />
        );
      }}
    />
    {error && (
      <ErrorMessage>
        <Icon icon={<BiErrorCircle />} /> {error.message}
      </ErrorMessage>
    )}
  </div>
);

export default FormInput;
