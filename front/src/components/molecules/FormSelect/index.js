import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import Select from '../../atoms/Select';

const FormSelect = ({
  size,
  label,
  options,
  essential,
  value,
  onChange,
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Select
      size={size}
      options={options}
      value={value}
      onChange={onChange}
    />
  </div>
);

FormSelect.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  essential: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
};

export default FormSelect;
