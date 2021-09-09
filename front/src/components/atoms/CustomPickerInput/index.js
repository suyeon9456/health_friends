import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { PickerWrap, PickerInput, PickerInputWrap, PickerSuffix } from './style';

const CustomPickerInput = forwardRef(({ value, onClick, type }, ref) => (
  <PickerWrap>
    <PickerInputWrap>
      <PickerInput
        className="example-custom-input"
        value={value}
        onClick={onClick}
        ref={ref}
        // size={size}
        // type={type}
        // placeholder={placeholder}
        // {...props}
      />
      <PickerSuffix>
        {type === 'date' ? <CalendarOutlined /> : <ClockCircleOutlined />}
      </PickerSuffix>
    </PickerInputWrap>
  </PickerWrap>
));

CustomPickerInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default CustomPickerInput;
