import React from 'react';

import { AppLayout, LoginForm } from '@/components/organisms';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

const Login = () => (
  <AppLayout>
    <LoginForm />
  </AppLayout>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  axios.defaults.headers!.Cookie = '';
  if (context.req && cookie) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios.defaults.headers!.Cookie = cookie;
  }
  const { data } = await axios.get('/user');
  if (data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
