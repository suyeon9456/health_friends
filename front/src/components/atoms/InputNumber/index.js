import React from 'react';
import PropTypes from 'prop-types';

import {
  InputNumberWrap,
  InputNumberBox,
  NumberHandlerWrap,
  NumberHandlerUp,
  NumberHandlerUpInner,
  NumberHandlerDown,
  NumberHandlerDownInner,
} from './style';

const InputNumber = ({ value, onChange, size, ...props }) => (
  <InputNumberWrap
    size={size}
  >
    <NumberHandlerWrap>
      <NumberHandlerUp
        role="button"
        unselectable="on"
        aria-disabled="false"
      >
        <NumberHandlerUpInner />
      </NumberHandlerUp>
      <NumberHandlerDown
        role="button"
        unselectable="on"
        aria-disabled="false"
      >
        <NumberHandlerDownInner />
      </NumberHandlerDown>
    </NumberHandlerWrap>
    <InputNumberBox
      role="spinbutton"
      type="number"
      value={value}
      onChange={onChange}
      {...props}
    />
  </InputNumberWrap>
);

InputNumber.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  props: PropTypes.node,
};

export default InputNumber;
