import React from 'react';
import { Controller } from 'react-hook-form';

import { Essential, Label } from './style';
import { InputTimePicker } from '../../atoms';

const FormTimePicker = ({ label, id, control, error, size, essential }: {
  id: string;
  label: string;
  control?: any;
  error?: any;
  size?: string;
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
          // error={error}
          onChange={onChange}
        />
      )}
    />
  </div>
);

export default FormTimePicker;
