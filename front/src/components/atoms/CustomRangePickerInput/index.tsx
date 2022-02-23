import React, { forwardRef } from 'react';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { RangePickerWrap, PickerInput, PickerInputWrap, PickerSuffix } from './style';

const CustomRangePickerInput = forwardRef(({ value, onClick, type, placeholder }: {
  value?: string;
  onClick?: () => void;
  type?: 'date' | 'time';
  placeholder?: string;
}, ref: React.ForwardedRef<HTMLInputElement>) => (
  <RangePickerWrap>
    <PickerInputWrap>
      <PickerInput
        className="example-custom-input"
        value={value}
        onClick={onClick}
        ref={ref}
        placeholder={placeholder}
      />
    </PickerInputWrap>
    <PickerSuffix>
      {type === 'date' ? <CalendarOutlined /> : <ClockCircleOutlined />}
    </PickerSuffix>
  </RangePickerWrap>
));

export default CustomRangePickerInput;
