import React from 'react';

import { AvatarWrapper } from './style';
import { Avatar } from '../../atoms';

const AvatarGroup = ({ size, users, ...props }: {
  size: string,
  users: Array<{ size: string, id: number | string, src: string }>
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
