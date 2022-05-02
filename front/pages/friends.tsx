import { loadGymsAPI } from '@/api/gym';
import axios from 'axios';
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import React, { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { gymsKey } from '../@utils/queryKey';
import {
  AppLayout,
  SearchGyms,
  SearchMap,
  Row,
  Col,
} from '../src/components/organisms';
import wrapper from '../store/configureStore';

const Friends = () => {
  const [foldedFriends, setFoldedFriends] = useState(true);
  const [foldedGym, setFoldedGym] = useState(false);

  return (
    <AppLayout childBlock>
      <Row>
        <Col xs={24} md={foldedGym && foldedFriends ? 1 : 8}>
          <SearchGyms
            foldedFriends={foldedFriends}
            setFoldedFriends={setFoldedFriends}
            foldedGym={foldedGym}
            setFoldedGym={setFoldedGym}
          />
        </Col>
        <Col xs={24} md={foldedGym && foldedFriends ? 23 : 16}>
          <SearchMap
            foldedFriends={foldedFriends}
            setFoldedFriends={setFoldedFriends}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    gymsKey({ searchWord: '', isSearch: true }),
    () => loadGymsAPI({ searchWord: '' })
  );
  console.log(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 30,
  };
};

export default Friends;
