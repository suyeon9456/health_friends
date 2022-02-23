import React from 'react';

import { SelectContainer, Options } from './style';

const Select = ({ size, options, name, value, onChange }: {
  size?: 'default' | 'small' | 'large';
  options: Array<{ text: string; value: string | number }>;
  name: string;
  value: number | string;
  onChange: () => void;
}) => (
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
