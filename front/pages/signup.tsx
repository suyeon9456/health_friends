import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import axios from 'axios';

import { AppLayout } from '@/components/organisms';
import SignupAllStep from '@/components/organisms/signup/SignupAllStep';
import SignupContents from '@/components/organisms/signup/SignupContents';
import styles from '../src/scss/signup.module.scss';

const Signup = () => {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AppLayout>
        <div className={styles.signupLayout}>
          <SignupAllStep />
          <div className={styles.contentsWrap}>
            <SignupContents />
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  axios.defaults.headers!.Cookie = '';
  if (context.req && cookie) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios.defaults.headers!.Cookie = cookie;
  }
  const { data } = await axios.get('/user/isLoggedIn');
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

export default Signup;
