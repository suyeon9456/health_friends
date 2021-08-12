/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { EnterIconWrapper,
  SearchIcon,
  InputContainer,
  InputWrapper,
  SearchWrapper,
  Textarea,
  TextareaWrapper,
  SearchLoadingIcon } from './style';
import useTextareaLength from '../../../hooks/useTextareaLength';

const Input = ({
  size = 'default',
  type = 'text',
  showCount = false,
  maxLength = 150,
  loading = false,
  placeholder,
  ...props
}) => {
  const [passwordType, setPasswordType] = useState(true);
  const [dataCount, setDataCount] = useState(0);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);

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

  if (type === 'textarea') {
    return (
      <TextareaWrapper
        showCount={showCount}
        data-count={dataCount || `0 / ${maxLength}`}
      >
        <Textarea
          onChange={onChangeDataCount}
          placeholder={placeholder}
          {...props}
        />
      </TextareaWrapper>
    );
  }

  if (type === 'search') {
    return (
      <SearchWrapper
        {...props}
      >
        <EnterIconWrapper>
          {loading ? <SearchLoadingIcon /> : <SearchIcon />}
        </EnterIconWrapper>
        <InputContainer
          size={size}
          type={type}
        />
      </SearchWrapper>
    );
  }

  if (type === 'password') {
    return (
      <InputWrapper>
        <InputContainer
          type={passwordType ? 'password' : 'text'}
          passwordType={type}
          size={size}
          {...props}
        />
        <span>
          {passwordType
            ? <LockOutlined color="#000000d9" onClick={onChangePasswordType} />
            : <UnlockOutlined color="#000000d9" onClick={onChangePasswordType} />}
        </span>
      </InputWrapper>
    );
  }

  return (
    <InputContainer
      size={size}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  loading: PropTypes.bool,
  props: PropTypes.any,
};

export default Input;
