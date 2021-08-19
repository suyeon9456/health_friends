import React from 'react';
import AppLayout from '../src/components/organisms/AppLayout';
import LoginForm from '../src/components/organisms/LoginForm';

const Login = () => {
  console.log('login');
  return (
    <AppLayout>
      <LoginForm />
    </AppLayout>
  );
};

export default Login;
