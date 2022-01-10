import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TextareaWrap, TextareaBox } from './style';

const Textarea = ({
  showCount = false,
  maxLength = 150,
  loading,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const [dataCount, setDataCount] = useState(0);
  useEffect(() => {
    setDataCount(value.length);
  }, [value]);
  return (
    <TextareaWrap
      showCount={showCount}
      data-count={`${dataCount} / ${maxLength}`}
      // data-count={maxLength}
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

Textarea.propTypes = {
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  loading: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
  props: PropTypes.any,
};

export default Textarea;
