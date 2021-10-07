import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import AppLayout from '../src/components/organisms/AppLayout';
import LoginForm from '../src/components/organisms/LoginForm';

const Login = () => {
  const { me } = useSelector((state) => state.user);
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
