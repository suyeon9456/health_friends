import React, { forwardRef } from 'react';
import { BiTime, BiCalendar } from 'react-icons/bi';

import { CustomPickerInputProps } from '@/../@types/atoms';
import { PickerType } from '@/../@types/constant';
import {
  RangePickerWrap,
  PickerInput,
  PickerInputWrap,
  PickerSuffix,
} from './style';
import Icon from '../Icon';

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
          <Icon icon={<BiCalendar />} />
        ) : (
          <Icon icon={<BiTime />} />
        )}
      </PickerSuffix>
    </RangePickerWrap>
  )
);

export default CustomRangePickerInput;
