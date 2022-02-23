import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { StyledButton } from './style';

const Button = ({
  children,
  icon,
  size = 'default',
  type = 'default',
  name,
  buttonLoading = false,
  block = false,
  disabled = false,
  submit = false,
  onClick,
  ...props
}: {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  size?: 'default' | 'small' | 'large';
  type?: 'default'
    | 'primary'
    | 'error'
    | 'success'
    | 'warning'
    | 'line-primary'
    | 'signature'
    | 'text';
  name?: string;
  buttonLoading?: boolean;
  block?: boolean;
  disabled?: boolean;
  submit?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}) => (
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
