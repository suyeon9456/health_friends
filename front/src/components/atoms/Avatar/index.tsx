import React from 'react';
import { AppProps } from 'next/app';
import { UserOutlined } from '@ant-design/icons';

import { StyledAvatar } from './style';

const Avatar = ({ size = 'default', src, ...props }: {
  size?: string | number,
  src?: string,
  style?: React.CSSProperties,
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

export default Avatar;
