import React from 'react';
import PropTypes from 'prop-types';

import { SelectContainer, Options } from './style';

const Select = ({ size, options }) => (
  <SelectContainer size={size}>
    {options.map((option) => (
      <Options
        key={option.value}
      >
        {option.text}
      </Options>
    ))}
  </SelectContainer>
);

Select.propTypes = {
  size: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
