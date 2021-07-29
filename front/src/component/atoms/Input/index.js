import React from 'react';
import PropTypes from 'prop-types';
import { EyeInvisibleOutlined } from '@ant-design/icons';

import { StyledInput } from './style';

const Input = ({
  size = 'default',
  type = 'text',
  ...props
}) => {
  // if (type === 'password') {
  //   return (
  //     <StyledInput
  //       size={size}
  //       type={type}
  //       {...props}
  //     >
  //       <EyeInvisibleOutlined />
  //     </StyledInput>
  //   );
  // }

  return (
    <StyledInput
      size={size}
      type={type}
      {...props}
    />
  );
};

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  props: PropTypes.any,
};

export default Input;
