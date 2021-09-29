import React from 'react';
import PropTypes from 'prop-types';

import { SelectContainer, Options } from './style';

const Select = ({ size, options, value, onChange }) => (
  <SelectContainer
    size={size}
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

Select.propTypes = {
  size: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default Select;
