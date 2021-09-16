import React from 'react';
import PropTypes from 'prop-types';
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
    <span>{children}</span>
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  size: PropTypes.string,
  type: PropTypes.string,
  buttonLoading: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
  onClick: PropTypes.func,
  props: PropTypes.any,
};

export default Button;
