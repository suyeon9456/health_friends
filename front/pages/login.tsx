import React, { useEffect } from 'react';
import Router from 'next/router';

import { AppLayout, LoginForm } from '@/components/organisms';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Me } from '../@types/user';

const Login = () => {
  const { data: me } = useQuery<Me>('user', async () => {
    const { data } = await axios.get('/user');
    return data;
  });
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
