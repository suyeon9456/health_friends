import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Essential, Label } from './style';
import Textarea from '../../atoms/Textarea';

const FormTextarea = ({ label, placeholder, maxLength, control, error, id,
  showCount = false, essential = false }) => (
    <div>
      <Label>
        {label}
        {essential && <Essential />}
      </Label>
      <Controller
        control={control}
        name={id}
        render={({ field: { value, onChange } }) => (
          <Textarea
            name={id}
            placeholder={placeholder}
            maxLength={maxLength}
            showCount={showCount}
            value={value}
            error={error}
            onChange={onChange}
          />
        )}
      />
    </div>
);

FormTextarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  essential: PropTypes.bool,
  id: PropTypes.string,
  control: PropTypes.any,
  error: PropTypes.any,
};

export default FormTextarea;
