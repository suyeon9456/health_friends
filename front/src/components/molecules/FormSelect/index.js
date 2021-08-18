import React from 'react';
import PropTypes from 'prop-types';

import { Essential, Label } from './style';
import Select from '../../atoms/Select';

const FormSelect = ({
  size,
  label,
  options,
  essential,
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <Select
      size={size}
      options={options}
    />
  </div>
);

FormSelect.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  essential: PropTypes.bool,
};

export default FormSelect;
