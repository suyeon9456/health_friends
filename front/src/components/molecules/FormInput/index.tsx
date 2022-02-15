import React from 'react';
import { Controller } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ErrorMessage, Input } from '@/components/atoms';
import { Essential, Label } from './style';

const FormInput = ({ label,
  id,
  size,
  type,
  placeholder,
  essential,
  control,
  error,
  disabled,
  ...props }: {
    label?: any
    id?: string,
    size?: any,
    type?: string,
    placeholder?: string,
    essential?: boolean,
    control?: any,
    error?: any,
    disabled?: boolean,
  }) => (
    <div>
      {label && (
        <Label>
          {label}
          {essential && <Essential />}
        </Label>
      )}
      <Controller
        control={control}
        name={id || ''}
        render={({ field }) => (
          <Input
            type={type}
            name={id}
            placeholder={placeholder}
            value={field.value}
            error={error}
            onChange={field.onChange}
            disabled={disabled}
            {...props}
          />
        )}
      />
      {error && (
        <ErrorMessage><ExclamationCircleOutlined /> {error.message}</ErrorMessage>
      )}
    </div>
);

export default FormInput;
