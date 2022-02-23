import React, { Dispatch, SetStateAction } from 'react';

import { InputNumber } from '@/components/atoms';
import { Essential, Label } from './style';

const FormInputNumber = ({ label,
  value,
  setValue,
  onChange,
  size,
  placeholder,
  essential,
  ...props
}: {
  label: string;
  value: number;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: () => void;
  size?: 'small' | 'large';
  placeholder?: string;
  essential?: boolean;
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <InputNumber
      size={size}
      {...props}
      value={value}
      onChange={onChange}
      setValue={setValue}
      {...{ placeholder }}
    />
  </div>
);

export default FormInputNumber;
