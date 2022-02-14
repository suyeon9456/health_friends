import React, { useCallback, useState } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { InputContainer, InputContent, InputWrap, InputWrapBox } from './style';
import { Message, MultipleFieldErrors } from 'react-hook-form';

export type FieldError = {
  type: string;
  types?: MultipleFieldErrors;
  message?: Message;
};


const Input = ({
  name,
  size,
  type = 'text',
  loading,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  ...props
}: {
  name?: any,
  size?: any,
  type?: string,
  loading?: boolean,
  value: string,
  onChange: (event:  React.ChangeEvent<HTMLInputElement>)  =>  void,
  // onChange: (event:  React.MouseEventHandler<HTMLInputElement>)  =>  void,
  placeholder?: string,
  disabled?: boolean,
  error?: Array<FieldError>,
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
            size={size ?? 'default'}
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
