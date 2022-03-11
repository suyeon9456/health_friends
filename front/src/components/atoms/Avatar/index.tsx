import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import { StyledAvatar } from './style';
import { AvatarProps } from '@/../@types/atoms';
import { SizeType } from '@/../@types/utils';

const Avatar = ({ size = SizeType.DEFAULT, src, ...props }: AvatarProps) => (
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
