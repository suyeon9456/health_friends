import React, { useCallback } from 'react';
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

const InputNumber = ({ value, onChange, setValue, size, ...props }) => {
  const onChangeUpAge = useCallback(() => {
    setValue((prev) => parseInt(prev, 10) + 1);
  }, [value]);
  const onChangeDownAge = useCallback(() => {
    setValue((prev) => parseInt(prev, 10) - 1);
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

InputNumber.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  setValue: PropTypes.any.isRequired,
  size: PropTypes.string,
  props: PropTypes.node,
};

export default InputNumber;
