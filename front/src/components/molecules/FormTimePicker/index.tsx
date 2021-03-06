import React from 'react';
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form';

import { BaseSizeTypeT } from '@/../@types/constant';
import { InputTimePicker } from '../../atoms';
import { Essential, Label } from './style';

const FormTimePicker = ({
  label,
  id,
  control,
  error,
  size,
  essential,
}: {
  id: string;
  label: string;
  control?: Control<FieldValues, object>;
  error?: FieldError | undefined;
  size?: BaseSizeTypeT;
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
        <InputTimePicker
          name={id}
          size={size}
          value={value}
          onChange={onChange}
        />
      )}
    />
  </div>
);

export default FormTimePicker;
