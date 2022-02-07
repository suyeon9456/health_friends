import React, { useEffect, useState } from 'react';

import { TextareaWrap, TextareaBox } from './style';

const Textarea = ({
  showCount = false,
  maxLength = 150,
  loading,
  value,
  onChange,
  placeholder,
  ...props
}: {
  showCount: boolean,
  maxLength: number,
  loading: boolean,
  value: string,
  onChange: () => void,
  placeholder: string
}) => {
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </TextareaWrap>
  );
};

export default Textarea;
