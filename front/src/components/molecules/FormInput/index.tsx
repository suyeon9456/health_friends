import React from 'react';
import { Control, Controller, FieldError, FieldPath, FieldValues, Path, UseControllerProps } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ErrorMessage, Input } from '@/components/atoms';
import { Essential, Label } from './style';
import { InputTypeT, SizeTypeT } from '@/../@types/utils';

type FormInputType<T> = {
  label?: string;
  id: Path<T>;
  size?: SizeTypeT;
  type?: InputTypeT;
  placeholder?: string;
  essential?: boolean;
  control?: Control<T, object>;
  error?: FieldError | undefined;
  disabled?: boolean;
}

const FormInput = <T extends FieldValues>({ label,
  id,
  size,
  type,
  placeholder,
  essential,
  control,
  error,
  disabled,
  ...props }: FormInputType<T>) => (
    <div>
      {label && (
        <Label>
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
          )
        }}
      />
      {error && (
        <ErrorMessage><ExclamationCircleOutlined /> {error.message}</ErrorMessage>
      )}
    </div>
);

export default FormInput;
