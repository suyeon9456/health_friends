import React from 'react';
import PropTypes from 'prop-types';
import { AvatarWrapper } from './style';
import Avatar from '../../atoms/Avatar';

const AvatarGroup = ({ size, users, ...props }) => (
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

AvatarGroup.propTypes = {
  size: PropTypes.node,
  users: PropTypes.array,
  props: PropTypes.any,
};

export default AvatarGroup;
