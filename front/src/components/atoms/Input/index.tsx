import React from 'react';
import { BiLock, BiLockOpen } from 'react-icons/bi';

import { InputProps } from '@/../@types/atoms';
import { InputType, SizeType } from '@/../@types/constant';
import useIsState from '@/hooks/useIsState';
import { InputContainer, InputContent, InputWrap, InputWrapBox } from './style';
import Icon from '../Icon';

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
  const [isPassword, onChangeIsPassword] = useIsState(true);

  if (type === InputType.PASSWORD) {
    return (
      <div>
        <InputWrapBox>
          <InputContent>
            <InputWrap error={error}>
              <InputContainer
                name={name}
                rules={{ required: true }}
                type={isPassword ? 'password' : 'text'}
                passwordType={type}
                value={value}
                onChange={onChange}
                onCopy={() => false}
                inputsize={size}
                placeholder={placeholder}
                {...props}
              />
              <span>
                {isPassword ? (
                  <Icon icon={<BiLock />} onClick={onChangeIsPassword} />
                ) : (
                  <Icon icon={<BiLockOpen />} onClick={onChangeIsPassword} />
                )}
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
