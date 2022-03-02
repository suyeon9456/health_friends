import React, { forwardRef } from 'react';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { PickerWrap, PickerInput, PickerInputWrap, PickerSuffix } from './style';
import { CustomPickerInputProps } from '@/../@types/atoms';

const CustomPickerInput = forwardRef(({
  value,
  onClick,
  type,
  size,
  placeholder
  }: CustomPickerInputProps, ref) => (
    <PickerWrap
      size={size}
    >
      <PickerInputWrap>
        <PickerInput
          className="example-custom-input"
          value={value}
          onClick={onClick}
          ref={ref}
          placeholder={placeholder}
          readOnly
        />
        <PickerSuffix>
          {type === 'date' ? <CalendarOutlined /> : <ClockCircleOutlined />}
        </PickerSuffix>
      </PickerInputWrap>
    </PickerWrap>
  ));

export default CustomPickerInput;
