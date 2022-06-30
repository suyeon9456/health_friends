import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { ButtonProps } from '@/../@types/atoms';
import { ButtonType, SizeType } from '@/../@types/constant';
import { StyledButton } from './style';
import Icon from '../Icon';

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
    {buttonLoading ? <Icon icon={<BiLoaderAlt />} /> : icon}
    <span {...props}>{children}</span>
  </StyledButton>
);

export default React.memo(Button);
