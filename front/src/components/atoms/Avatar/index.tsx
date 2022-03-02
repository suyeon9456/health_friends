import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import { StyledAvatar } from './style';
import { AvatarProps } from '@/../@types/atoms';

const Avatar = ({ size = 'default', src, ...props }: AvatarProps) => (
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
