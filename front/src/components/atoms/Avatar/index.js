import React from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

import { StyledAvatar } from './style';

const Avatar = ({
  size = 'default',
  src,
  ...props
}) => (
  <StyledAvatar
    size={size}
    src={src}
    {...props}
  >
    {src
      ? <img src={src} alt={src} />
      : <UserOutlined />}
  </StyledAvatar>
);

Avatar.propTypes = {
  size: PropTypes.node,
  src: PropTypes.node,
  props: PropTypes.any,
};

export default Avatar;
