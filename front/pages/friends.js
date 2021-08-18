import React from 'react';
import AppLayout from '../src/components/organisms/AppLayout';
import FriendsLayout from '../components/FriendsLayout';

const Friends = () => {
  console.log('Friends');
  return (
    <AppLayout>
      <FriendsLayout />
    </AppLayout>
  );
};

export default Friends;
