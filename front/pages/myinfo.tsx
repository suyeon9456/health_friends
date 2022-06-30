import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { GetServerSidePropsContext } from 'next';
import { useQuery } from 'react-query';
import { loadMyinfoAPI } from '@/api/profile';
import { useRouter } from 'next/router';
import { useLoadLoginedUser } from '@/hooks';
import ProfileContents from '@/components/organisms/profile/ProfileContents';
import { loadProfile } from '../reducers/profile';

import { AppLayout, SideBar, Row, Col } from '../src/components/organisms';
import MatchingCalendar from '../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../src/components/organisms/profile/MatchingRecord';
import LikedList from '../src/components/organisms/profile/LikedList';
import { GlobalModal, ModalStatus } from '../@types/constant';
import { profileKey } from '../@utils/queryKey';
import { useModalDispatch } from '../store/modalStore';
import { loadMe } from '../reducers/user';

const Myinfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();

  const _ = useLoadLoginedUser({ onSuccess: (data) => dispatch(loadMe(data)) });

  useQuery(profileKey, () => loadMyinfoAPI(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => dispatch(loadProfile(data)),
    onError: () =>
      contextDispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: GlobalModal.ALERT,
          statusType: ModalStatus.ERROR,
          message: '존재하지 않는 사용자입니다.',
          block: true,
          callback: () => router.replace('/'),
        },
      }),
    useErrorBoundary: false,
  });

  // const page = useMemo(() => {
  //   return router.query.tab !== undefined ? router.query.tab : Menu.INFO;
  // }, [router.query]);

  // useEffect(() => setProfileMenu(page as ProfileMenuType), [page]);

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
