import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { GetServerSidePropsContext } from 'next';
import { useQuery, useQueryErrorResetBoundary } from 'react-query';
import { loadMyinfoAPI } from '@/api/profile';
import { useRouter } from 'next/router';
import { useLoadLoginedUser } from '@/hooks';
import ErrorBoundary from '@/components/organisms/ErrorBoundary';
import ErrorFallback from '@/components/organisms/ErrorFallback';
import { loadProfile } from '../reducers/profile';

import {
  AppLayout,
  SideBar,
  Info,
  MoreInfo,
  Row,
  Col,
} from '../src/components/organisms';
import MatchingCalendar from '../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../src/components/organisms/profile/MatchingRecord';
import LikedList from '../src/components/organisms/profile/LikedList';
import {
  GlobalModal,
  Menu,
  ModalStatus,
  ProfileMenuType,
} from '../@types/constant';
import { profileKey } from '../@utils/queryKey';
import { useModalDispatch } from '../store/modalStore';
import { loadMe } from '../reducers/user';

const Myinfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const { reset } = useQueryErrorResetBoundary();
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

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

  const page = useMemo(() => {
    return router.query.tab !== undefined ? router.query.tab : Menu.INFO;
  }, [router.query]);

  useEffect(() => setProfileMenu(page as ProfileMenuType), [page]);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://health-friends.com/myinfo" />
        <title>마이페이지</title>
      </Head>
      <AppLayout childBlock>
        <Row>
          <Col xs={24} md={8}>
            <SideBar
              profileMenu={profileMenu}
              setProfileMenu={setProfileMenu}
            />
          </Col>
          <Col xs={24} md={16}>
            {
              {
                [Menu.LIKED]: (
                  <ErrorBoundary
                    onReset={reset}
                    fallback={ErrorFallback}
                    message="관심친구를 로드하는데 실패 하였습니다."
                  >
                    <LikedList />
                  </ErrorBoundary>
                ),
                [Menu.CALENDAR]: (
                  <ErrorBoundary
                    onReset={reset}
                    fallback={ErrorFallback}
                    message="매칭일정을 로드하는데 실패 하였습니다."
                  >
                    <MatchingCalendar />
                  </ErrorBoundary>
                ),
                [Menu.RECORD]: (
                  <ErrorBoundary
                    onReset={reset}
                    fallback={ErrorFallback}
                    message="매칭기록을 로드하는데 실패 하였습니다."
                  >
                    <MatchingRecord />
                  </ErrorBoundary>
                ),
                [Menu.INFO]: (
                  <div>
                    <Info />
                    <MoreInfo />
                  </div>
                ),
              }[profileMenu]
            }
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
  const { data } = await axios.get('/isLoggedIn');
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
