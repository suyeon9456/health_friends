import React from 'react';
import AppLayout from '../components/AppLayout';
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
