import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

import { Essential, Label } from './style';
import Textarea from '../../atoms/Textarea';

const FormTextarea = <T extends FieldValues>({
  label,
  placeholder,
  maxLength,
  control,
  error,
  id,
  showCount = false,
  essential = false,
}: {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  control?: Control<T, object>;
  error?: FieldError | undefined;
  id: Path<T>;
  showCount?: boolean;
  essential?: boolean;
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Controller
      control={control}
      name={id}
      render={({ field: { value, onChange } }) => (
        <Textarea
          name={id}
          placeholder={placeholder}
          maxLength={maxLength}
          showCount={showCount}
          value={value}
          onChange={onChange}
        />
      )}
    />
  </div>
);

export default FormTextarea;
