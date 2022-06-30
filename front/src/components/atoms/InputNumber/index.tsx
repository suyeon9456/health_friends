import React, { useCallback } from 'react';

import { inputNumber } from '@/../@utils/calculation';
import { InputNumberProps } from '@/../@types/atoms';
import { InputNumberType } from '@/../@types/constant';

import {
  InputNumberWrap,
  InputNumberBox,
  NumberHandlerWrap,
  NumberHandlerUp,
  NumberHandlerUpInner,
  NumberHandlerDown,
  NumberHandlerDownInner,
} from './style';

const InputNumber = ({
  value,
  onChange,
  setValue,
  size,
  ...props
}: InputNumberProps) => {
  const onChangeUpAge = useCallback(() => {
    setValue((prev: string) =>
      inputNumber({ type: InputNumberType.PLUSE, prev })
    );
  }, [value]);
  const onChangeDownAge = useCallback(() => {
    setValue((prev: string) =>
      inputNumber({ type: InputNumberType.MINUS, prev })
    );
  }, [value]);
  return (
    <InputNumberWrap size={size}>
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
