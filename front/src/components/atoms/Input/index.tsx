import React, { useCallback, useState } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { InputContainer, InputContent, InputWrap, InputWrapBox } from './style';
import { InputProps } from '@/../@types/atoms';
import { InputType, SizeType } from '@/../@types/utils';


const Input = ({
  name,
  size = SizeType.DEFAULT,
  type = InputType.TEXT,
  loading,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  ...props
}: InputProps) => {
  const [passwordType, setPasswordType] = useState(true);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);

  if (type === InputType.PASSWORD) {
    return (
      <div>
        <InputWrapBox>
          <InputContent>
            <InputWrap error={error}>
              <InputContainer
                name={name}
                rules={{ required: true }}
                type={passwordType ? 'password' : 'text'}
                passwordType={type}
                value={value}
                onChange={onChange}
                inputsize={size}
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
      </div>
    );
  }

  return (
    <div>
      <InputWrapBox>
        <InputContent>
          <InputContainer
            value={value}
            onChange={onChange}
            inputsize={size}
            placeholder={placeholder}
            readOnly={disabled}
            error={error}
            name={name}
            {...props}
          />
        </InputContent>
      </InputWrapBox>
    </div>
  );
};

export default Input;
