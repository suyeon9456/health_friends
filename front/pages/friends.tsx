import React, { Suspense, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient } from 'react-query';
import { loadGymsAPI } from '@/api/gym';
import ErrorBoundary from '@/components/organisms/ErrorBoundary';
import ErrorFallback from '@/components/organisms/ErrorFallback';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { gymsKey, initialGymsKey } from '../@utils/queryKey';
import {
  AppLayout,
  SearchGyms,
  SearchMap,
  Row,
  Col,
  SearchFriends,
} from '../src/components/organisms';

const Friends = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://health-friends.com/friends" />
        <title>함께 운동할 친구찾기</title>
      </Head>
      <AppLayout childBlock>
        <Row>
          <Col xs={24} md={8}>
            <SearchGyms />
            <SearchFriends />
          </Col>
          <Col xs={24} md={16}>
            <ErrorBoundary
              isRefresh
              fallback={ErrorFallback}
              message="지도를 로드하는데 실패 하였습니다."
            >
              <SearchMap />
            </ErrorBoundary>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(initialGymsKey, () =>
    loadGymsAPI({ searchWord: '', mapBounds: null })
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Friends;
