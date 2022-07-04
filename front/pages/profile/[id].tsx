import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loadProfile, updateTab } from '@/../reducers/profile';
import { GlobalModal, Menu, ModalStatus } from '@/../@types/constant';

import { dehydrate, QueryClient, useQuery } from 'react-query';
import { loadProfileAPI } from '@/api/profile';
import { profileByIdKey } from '@/../@utils/queryKey';
import { useModalDispatch } from '@/../store/modalStore';
import { loadMe } from '@/../reducers/user';
import { useLoadLoginedUser } from '@/hooks';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import ProfileContents from '@/components/organisms/profile/ProfileContents';
import { AppLayout, SideBar, Row, Col } from '../../src/components/organisms';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();

  const { id } = router.query;

  useQuery(profileByIdKey(id), () => loadProfileAPI(id), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;
      dispatch(loadProfile(data));
    },
    onError: () => {
      contextDispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: GlobalModal.ALERT,
          statusType: ModalStatus.ERROR,
          message: '존재하지 않는 사용자입니다.',
          block: true,
          callback: () => router.replace('/'),
        },
      });
    },
    useErrorBoundary: false,
  });

  const page = useMemo(() => {
    return router.query.tab !== undefined ? router.query.tab : Menu.INFO;
  }, [router.query]);

  useEffect(() => {
    dispatch(updateTab(page));
  }, [page]);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://health-friends.com/profile" />
        <title>사용자 프로필</title>
      </Head>
      <AppLayout>
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(profileByIdKey(context?.params?.id), () =>
    loadProfileAPI(context?.params?.id)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Profile;
