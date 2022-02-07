import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { StyledButton } from './style';

const Button = ({
  children,
  icon,
  size = 'default',
  type = 'default',
  buttonLoading = false,
  block = false,
  disabled = false,
  submit = false,
  onClick,
  ...props
}: {
  children?: React.ReactNode,
  icon?: React.ReactNode,
  size?: string,
  type: string,
  buttonLoading?: boolean,
  block?: boolean,
  disabled?: boolean,
  submit?: boolean,
  onClick?: () => void,
}) => (
  <StyledButton
    size={size}
    styleType={type}
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
