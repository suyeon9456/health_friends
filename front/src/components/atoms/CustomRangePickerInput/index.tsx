import React, { forwardRef } from 'react';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { CustomPickerInputProps } from '@/../@types/atoms';
import { PickerType } from '@/../@types/utils';
import {
  RangePickerWrap,
  PickerInput,
  PickerInputWrap,
  PickerSuffix,
} from './style';

const CustomRangePickerInput = forwardRef(
  (
    { value, onClick, type, placeholder }: CustomPickerInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
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
        {type === PickerType.DATE ? (
          <CalendarOutlined />
        ) : (
          <ClockCircleOutlined />
        )}
      </PickerSuffix>
    </RangePickerWrap>
  )
);

export default CustomRangePickerInput;
