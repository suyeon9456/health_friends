import React from 'react';
import PropTypes from 'prop-types';

import { SelectContainer, Options } from './style';

const Select = ({ options }) => (
  <SelectContainer>
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
  options: PropTypes.array,
};

export default Select;
