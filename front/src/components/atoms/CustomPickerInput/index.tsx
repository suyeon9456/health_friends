import React, { forwardRef } from 'react';
import { BiTime, BiCalendar } from 'react-icons/bi';

import { CustomPickerInputProps } from '@/../@types/atoms';
import { PickerType } from '@/../@types/utils';
import {
  PickerWrap,
  PickerInput,
  PickerInputWrap,
  PickerSuffix,
} from './style';
import Icon from '../Icon';

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
            <Icon icon={<BiCalendar />} />
          ) : (
            <Icon icon={<BiTime />} />
          )}
        </PickerSuffix>
      </PickerInputWrap>
    </PickerWrap>
  )
);

export default CustomPickerInput;
