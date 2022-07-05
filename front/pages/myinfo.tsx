import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import ProfileContents from '@/components/organisms/profile/ProfileContents';
import { updateTab } from '../reducers/profile';

import { AppLayout, SideBar, Row, Col } from '../src/components/organisms';
import { Menu } from '../@types/constant';

const Myinfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const page = useMemo(() => {
    return router.query.tab !== undefined ? router.query.tab : Menu.INFO;
  }, [router.query]);

  useEffect(() => {
    dispatch(updateTab(page));
  }, [page]);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://health-friends.com/myinfo" />
        <title>마이페이지</title>
      </Head>
      <AppLayout childBlock>
        <Row>
          <Col xs={24} md={8}>
            <SideBar />
          </Col>
          <Col xs={24} md={16}>
            <ProfileContents />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const { ctx: { req } } = context;
  const cookie = context.req ? context.req.headers.cookie : '';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  axios.defaults.headers!.Cookie = '';
  if (context.req && cookie) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios.defaults.headers!.Cookie = cookie;
  }
  const { data } = await axios.get('/user/isLoggedIn');
  if (!data) {
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

export default Myinfo;
