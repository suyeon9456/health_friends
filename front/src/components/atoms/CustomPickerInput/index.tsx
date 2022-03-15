import React, { forwardRef } from 'react';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { CustomPickerInputProps } from '@/../@types/atoms';
import { PickerType } from '@/../@types/utils';
import {
  PickerWrap,
  PickerInput,
  PickerInputWrap,
  PickerSuffix,
} from './style';

const CustomPickerInput = forwardRef(
  (
    { value, onClick, type, size, placeholder }: CustomPickerInputProps,
    ref
  ) => (
    <PickerWrap size={size}>
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
          {type === PickerType.DATE ? (
            <CalendarOutlined />
          ) : (
            <ClockCircleOutlined />
          )}
        </PickerSuffix>
      </PickerInputWrap>
    </PickerWrap>
  )
);

export default CustomPickerInput;
