import React from 'react';
import FriendsLayout from '../components/FriendsLayout';
import { MenuList } from '../src/components/molecules/Menu/style';

const Friends = () => {
  console.log('Friends');
  return (
    <MenuList>
      <FriendsLayout />
    </MenuList>
  );
};

export default Friends;
