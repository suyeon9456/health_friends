import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { TextareaWrap, TextareaBox } from './style';
import useTextareaLength from '../../../hooks/useTextareaLength';

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

  const onChangeDataCount = useCallback((e) => {
    if (showCount) {
      // if (e.target.value.length > maxLength) {
      //   return
      // }
      const result = useTextareaLength({
        content: e.target.value.length, hasMaxLength: !!maxLength, maxLength,
      });
      setDataCount(result);
    }
  }, []);
  return (
    <TextareaWrap
      showCount={showCount}
      data-count={dataCount || `0 / ${maxLength}`}
    >
      <TextareaBox
        onChange={onChangeDataCount}
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
