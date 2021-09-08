import React from 'react';

import {
  InputNumberWrap,
  InputNumberBox,
  NumberHandlerWrap,
  NumberHandlerUp,
  NumberHandlerUpInner,
  NumberHandlerDown,
  NumberHandlerDownInner,
} from './style';

const InputNumber = () => (
  <InputNumberWrap>
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
    />
  </InputNumberWrap>
);

export default InputNumber;
