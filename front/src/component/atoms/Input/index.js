import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined, LockOutlined, SearchOutlined, UnlockOutlined } from '@ant-design/icons';

import { EnterButton,
  EnterButtonWrapper,
  InputContainer,
  InputWrapper,
  SearchWrapper,
  Textarea,
  TextareaWrapper } from './style';
import useTextareaLength from '../../../hooks/useTextareaLength';

const Input = ({
  size = 'default',
  type = 'text',
  showCount = false,
  maxLength = 150,
  enterButton = false,
  loading = false,
  ...props
}) => {
  const [passwordType, setPasswordType] = useState(true);
  const [dataCount, setDataCount] = useState(0);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);

  const onChangeDataCount = useCallback((e) => {
    if (showCount) {
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
          {...props}
        />
      </TextareaWrapper>
    );
  }

  if (type === 'search') {
    return (
      <SearchWrapper
        enterButton={enterButton}
        {...props}
      >
        <InputContainer
          size={size}
          enterButton={enterButton}
        />
        {enterButton && (
          <EnterButtonWrapper>
            <EnterButton
              size={size}
            >
              {loading ? <LoadingOutlined /> : <SearchOutlined />}
            </EnterButton>
          </EnterButtonWrapper>
        )}
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
            ? <LockOutlined onClick={onChangePasswordType} />
            : <UnlockOutlined onClick={onChangePasswordType} />}
        </span>
      </InputWrapper>
    );
  }

  return (
    <InputContainer
      size={size}
      type={type}
      {...props}
    />
  );
};

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  enterButton: PropTypes.bool,
  loading: PropTypes.bool,
  props: PropTypes.any,
};

export default Input;
