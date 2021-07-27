import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './style';

const Button = ({
  children,
  size = 'default',
  type = 'default',
  icon,
}) => {
  if (icon && !children) {
    return (
      <StyledButton
        size={size}
        type={type}
      />
    );
  }
  return (
    <StyledButton
      size={size}
      type={type}
    >
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default Button;
