import { InputNumberProps } from '@/../@types/atoms';
import React, { Dispatch, SetStateAction, useCallback } from 'react';

import { InputNumberWrap, InputNumberBox, NumberHandlerWrap, NumberHandlerUp, NumberHandlerUpInner, NumberHandlerDown, NumberHandlerDownInner } from './style';

const InputNumber = ({ value, onChange, setValue, size, ...props }: InputNumberProps) => {
  const onChangeUpAge = useCallback(() => {
    setValue((prev: string) => (parseInt(prev, 10) + 1).toString());
  }, [value]);
  const onChangeDownAge = useCallback(() => {
    setValue((prev: string) => (parseInt(prev, 10) - 1).toString());
  }, [value]);
  return (
    <InputNumberWrap
      size={size}
    >
      <NumberHandlerWrap>
        <NumberHandlerUp
          role="button"
          unselectable="on"
          aria-disabled="false"
          onClick={onChangeUpAge}
        >
          <NumberHandlerUpInner />
        </NumberHandlerUp>
        <NumberHandlerDown
          role="button"
          unselectable="on"
          aria-disabled="false"
          onClick={onChangeDownAge}
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
};

export default InputNumber;
