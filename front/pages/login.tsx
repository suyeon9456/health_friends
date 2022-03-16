import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { AppLayout, LoginForm } from '@/components/organisms';
import { userSelector } from '../reducers/user';

const Login = () => {
  const { me } = useSelector(userSelector);
  useEffect(() => {
    if (me?.id) {
      void Router.replace('/');
    }
  }, [me?.id]);
  return (
    <AppLayout>
      <LoginForm />
    </AppLayout>
  );
};

export default Login;
