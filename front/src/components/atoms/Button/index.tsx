import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { StyledButton } from './style';
import { ButtonProps } from '@/../@types/atoms';
import { ButtonType, SizeType } from '@/../@types/utils';

const Button = ({
  children,
  icon,
  size = SizeType.DEFAULT,
  type = ButtonType.DEFAULT,
  name,
  buttonLoading = false,
  block = false,
  disabled = false,
  submit = false,
  onClick,
  ...props
}: ButtonProps) => (
  <StyledButton
    size={size}
    styleType={type}
    name={name}
    block={block}
    buttonLoading={buttonLoading}
    disabled={disabled}
    onClick={onClick}
    type={submit ? 'submit' : 'button'}
    {...props}
  >
    {buttonLoading ? <LoadingOutlined /> : icon}
    <span {...props}>{children}</span>
  </StyledButton>
);

export default Button;
