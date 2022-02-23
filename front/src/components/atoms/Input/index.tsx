import React, { useCallback, useState } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { InputContainer, InputContent, InputWrap, InputWrapBox } from './style';
import { FieldError } from 'react-hook-form';


const Input = ({
  name,
  size = 'default',
  type = 'text',
  loading,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  ...props
}: {
  name?: string,
  size?: 'default' | 'small' | 'large';
  type?: 'text' | 'password';
  loading?: boolean;
  value: string;
  onChange: (event:  React.ChangeEvent<HTMLInputElement>)  =>  void;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError | undefined;
}) => {
  const [passwordType, setPasswordType] = useState(true);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);

  if (type === 'password') {
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
