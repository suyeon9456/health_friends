import { loadGymsAPI } from '@/api/gym';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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
