import React, { useEffect, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { dehydrate, QueryClient } from 'react-query';

import { updateTab } from '@/../reducers/profile';
import { loadProfileAPI } from '@/api/profile';
import { profileByIdKey } from '@/../@utils/queryKey';
import { Menu } from '@/../@types/constant';
import ProfileContents from '@/components/organisms/profile/ProfileContents';
import { AppLayout, SideBar, Row, Col } from '../../src/components/organisms';

const Profile = ({ dehydratedState }: any) => {
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
