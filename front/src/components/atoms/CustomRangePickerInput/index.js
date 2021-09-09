import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { RangePickerWrap, PickerInput, PickerInputWrap, PickerSuffix } from './style';

const CustomRangePickerInput = forwardRef(({ value, onClick, type, size, placeholder }, ref) => (
  <RangePickerWrap>
    <PickerInputWrap>
      <PickerInput
        className="example-custom-input"
        value={value}
        onClick={onClick}
        ref={ref}
        size={size}
        placeholder={placeholder}
        // {...props}
      />
    </PickerInputWrap>
    {/* <RangeSeparator>
      <SeparatorWrap>
        <SwapRightOutlined />
      </SeparatorWrap>
    </RangeSeparator> */}
    {/* <ActiveBar /> */}
    <PickerSuffix>
      {type === 'date' ? <CalendarOutlined /> : <ClockCircleOutlined />}
    </PickerSuffix>
  </RangePickerWrap>
));

CustomRangePickerInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomRangePickerInput;
