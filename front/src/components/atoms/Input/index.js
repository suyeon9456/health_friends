/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { InputContainer, InputContent, InputControlWrap, InputWrap, InputWrapBox } from './style';

const Input = ({
  size = 'default',
  type = 'text',
  loading,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  ...props
}) => {
  const [passwordType, setPasswordType] = useState(true);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);

  if (type === 'password') {
    return (
      <InputControlWrap>
        <InputWrapBox>
          <InputContent>
            <InputWrap error={error}>
              <InputContainer
                rules={{
                  required: true,
                }}
                type={passwordType ? 'password' : 'text'}
                passwordType={type}
                value={value}
                onChange={onChange}
                size={size}
                placeholder={placeholder}
                {...props}
              />
              <span>
                {passwordType
                  ? <LockOutlined color="#000000d9" onClick={onChangePasswordType} />
                  : <UnlockOutlined color="#000000d9" onClick={onChangePasswordType} />}
              </span>
            </InputWrap>
          </InputContent>
        </InputWrapBox>
      </InputControlWrap>
    );
  }

  return (
    <InputControlWrap>
      <InputWrapBox>
        <InputContent>
          <InputContainer
            value={value || ''}
            onChange={onChange}
            size={size}
            placeholder={placeholder}
            readOnly={disabled}
            error={error}
            {...props}
          />
        </InputContent>
      </InputWrapBox>
    </InputControlWrap>
  );
};

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.any,
  props: PropTypes.any,
};

export default Input;
