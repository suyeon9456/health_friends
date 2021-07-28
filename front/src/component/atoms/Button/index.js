import React from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

import { StyledButton } from './style';

const Button = ({
  children,
  icon,
  size = 'default',
  type = 'default',
  loading = false,
  block = false,
  disabled = false,
  onClick,
  ...props
}) => (
  <StyledButton
    size={size}
    type={type}
    block={block}
    loading={loading}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {loading ? <LoadingOutlined /> : icon}
    <span>{children}</span>
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  size: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  props: PropTypes.any,
};

export default Button;
