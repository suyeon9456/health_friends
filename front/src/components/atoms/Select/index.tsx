import React from 'react';

import { SelectContainer, Options } from './style';
import { SelectProps } from '@/../@types/atoms';

const Select = ({ size, options, name, value, onChange }: SelectProps) => (
  <SelectContainer
    name={name}
    selectsize={size}
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <Options
        key={option.value}
        value={option.value}
      >
        {option.text}
      </Options>
    ))}
  </SelectContainer>
);

export default Select;
