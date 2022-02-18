import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '../store/configureStore';
import { AppLayout, LoginForm } from '@/components/organisms';

const Login = () => {
  const { me } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);
  return (
    <AppLayout>
      <LoginForm />
    </AppLayout>
  );
};

export default Login;
