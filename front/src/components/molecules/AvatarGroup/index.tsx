import React from 'react';

import { AvatarWrapper } from './style';
import { Avatar } from '../../atoms';
import { SizeTypeT } from '@/../@types/utils';

const AvatarGroup = ({ size, users, ...props }: {
  size?: SizeTypeT | number;
  users: Array<{ id: number | string, src: string }>;
}) => (
  <AvatarWrapper
    {...props}
  >
    {users.map((user) => (
      <Avatar
        size={size}
        key={user.id}
        src={user.src}
      />
    ))}
  </AvatarWrapper>
);

export default AvatarGroup;
