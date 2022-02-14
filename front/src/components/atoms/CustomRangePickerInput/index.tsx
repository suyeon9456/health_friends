import React, { forwardRef } from 'react';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { RangePickerWrap, PickerInput, PickerInputWrap, PickerSuffix } from './style';

const CustomRangePickerInput = forwardRef(({ value, onClick, type, size, placeholder }: {
  value?: string;
  onClick?: () => void;
  type?: string;
  size?: string;
  placeholder?: string;
}, ref) => (
  <RangePickerWrap>
    <PickerInputWrap>
      <PickerInput
        className="example-custom-input"
        value={value}
        onClick={onClick}
        ref={ref}
        size={size}
        placeholder={placeholder}
      />
    </PickerInputWrap>
    <PickerSuffix>
      {type === 'date' ? <CalendarOutlined /> : <ClockCircleOutlined />}
    </PickerSuffix>
  </RangePickerWrap>
));

export default CustomRangePickerInput;
