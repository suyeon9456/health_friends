import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { QueryClient } from 'react-query';
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery('realtimeMathcing', () =>
      axios.get('/users/realtimeMathcing')
    );
    console.log('queryClient', queryClient);
    return {
      props: {
        // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  });

export default Friends;
