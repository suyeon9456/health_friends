import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';

import { AppLayout, LoginForm } from '@/components/organisms';
import axios from 'axios';

const Login = () => (
  <>
    <Head>
      <meta
        name="description"
        content="내가 이용하는 헬스장에서 운동하는 친구 찾아 함께 운동 해보자"
      />
      <title>로그인</title>
    </Head>
    <AppLayout>
      <LoginForm />
    </AppLayout>
  </>
);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
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
