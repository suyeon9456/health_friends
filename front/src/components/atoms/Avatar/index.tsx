import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import { AvatarProps } from '@/../@types/atoms';
import { SizeType } from '@/../@types/utils';
import { StyledAvatar } from './style';

const Avatar = ({ size = SizeType.DEFAULT, src, ...props }: AvatarProps) => (
  <StyledAvatar size={size} src={src} {...props}>
    {src ? <img src={src} alt={src} /> : <UserOutlined />}
  </StyledAvatar>
);

export default Avatar;
