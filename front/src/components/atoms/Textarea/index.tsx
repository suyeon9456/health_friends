import { TextareaProps } from '@/../@types/atoms';
import React, { useEffect, useState } from 'react';

import { TextareaWrap, TextareaBox } from './style';

const Textarea = ({
  name,
  showCount = false,
  maxLength = 150,
  loading,
  value,
  onChange,
  placeholder,
  ...props
}: TextareaProps) => {
  const [dataCount, setDataCount] = useState(0);
  useEffect(() => {
    setDataCount(value.length);
  }, [value]);
  return (
    <TextareaWrap
      showCount={showCount}
      data-count={`${dataCount} / ${maxLength}`}
    >
      <TextareaBox
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </TextareaWrap>
  );
};

export default Textarea;
