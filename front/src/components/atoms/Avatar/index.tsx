import React from 'react';
import { BiUser } from 'react-icons/bi';

import { AvatarProps } from '@/../@types/atoms';
import { SizeType } from '@/../@types/constant';
import { StyledAvatar } from './style';
import Icon from '../Icon';

const Avatar = ({ size = SizeType.DEFAULT, src, ...props }: AvatarProps) => (
  <StyledAvatar size={size} src={src} {...props}>
    {src ? <img src={src} alt={src} /> : <Icon icon={<BiUser />} />}
  </StyledAvatar>
);

export default React.memo(Avatar);
