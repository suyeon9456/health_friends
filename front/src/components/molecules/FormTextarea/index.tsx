import React from 'react';
import { Controller } from 'react-hook-form';

import { Essential, Label } from './style';
import Textarea from '../../atoms/Textarea';

const FormTextarea = ({
  label,
  placeholder,
  maxLength,
  control,
  error,
  id,
  showCount = false,
  essential = false }: {
    label: string;
    placeholder?: string;
    maxLength?: number;
    control?: any;
    error?: any;
    id: string;
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
            // error={error}
            onChange={onChange}
          />
        )}
      />
    </div>
);

export default FormTextarea;
