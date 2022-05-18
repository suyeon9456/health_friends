import React from 'react';

import { SelectProps } from '@/../@types/atoms';
import { SelectContainer } from './style';

const Select = React.memo(
  ({ size, options, name, value, onChange }: SelectProps) => (
    <SelectContainer
      name={name}
      selectsize={size}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </SelectContainer>
  )
);

export default Select;
