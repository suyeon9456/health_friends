import { loadRankingAPI, loadRealtimeAPI, loadRecommendAPI } from '@/api/user';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React, { Suspense, useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { recommendKey } from '../@utils/queryKey';

import { AppLayout, Main, Footer } from '../src/components/organisms';

const Home = () => {
  useEffect(() => {
    console.log('testestsetst');
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="내가 이용하는 헬스장에서 운동하는 친구 찾아 함께 운동 해보자"
        />
        <title>health-friends</title>
      </Head>
      <AppLayout spanNumber={24}>
        <Main />
        <Footer />
      </AppLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['realtime'], () => loadRealtimeAPI());
  await queryClient.prefetchQuery(['ranking'], () => loadRankingAPI());
  // await queryClient.prefetchQuery(recommendKey(), () => loadRecommendAPI());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
