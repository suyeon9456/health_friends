import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { loadGymsAPI } from '@/api/gym';
import { dehydrate, QueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import ErrorBoundary from '@/components/organisms/ErrorBoundary';
import ErrorFallback from '@/components/organisms/ErrorFallback';
import { gymsKey } from '../@utils/queryKey';
import { foldedItemSelector } from '../reducers/gym';
import {
  AppLayout,
  SearchGyms,
  SearchMap,
  Row,
  Col,
} from '../src/components/organisms';

const Friends = () => {
  const { isFoldedGym, isFoldedFriends } = useSelector(foldedItemSelector);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://health-friends.com/friends" />
        <title>함께 운동할 친구찾기</title>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b59bfdf3af450270c49c69d14f47cdd5&libraries=services"
        />
      </Head>
      <AppLayout childBlock>
        <Row>
          <Col
            xs={24}
            md={
              // eslint-disable-next-line no-nested-ternary
              !isFoldedGym && isFoldedFriends
                ? 8
                : !isFoldedGym && !isFoldedFriends
                ? 15
                : 1
            }
          >
            <SearchGyms />
          </Col>
          <Col
            xs={24}
            md={
              // eslint-disable-next-line no-nested-ternary
              !isFoldedGym && isFoldedFriends
                ? 16
                : !isFoldedGym && !isFoldedFriends
                ? 9
                : 23
            }
          >
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    gymsKey({ searchWord: '', mapBounds: null }),
    () => loadGymsAPI({ searchWord: '', mapBounds: null })
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Friends;
