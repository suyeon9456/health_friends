import React from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

import { StyledAvatar } from './style';

const Avatar = ({
  size = 'default',
  src,
  ...props
}) => {
  console.log('avatar');
  return (
    <StyledAvatar
      size={size}
      src={src}
      {...props}
    >
      {src || <UserOutlined />}
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  size: PropTypes.string,
  src: PropTypes.node,
  props: PropTypes.any,
};

export default Avatar;
