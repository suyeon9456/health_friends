/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { useState } from 'react';
import { Store } from 'redux';
import { END } from 'redux-saga';
import axios from 'axios';

import { GetServerSideProps } from 'next';
import wrapper from '../store/configureStore';
import {
  AppLayout,
  SearchGyms,
  SearchMap,
  Row,
  Col,
} from '../src/components/organisms';

import { loadMyInfoRequest } from '../reducers/user';

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
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios!.defaults!.headers!.Cookie = '';
    if (req && cookie) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      axios!.defaults!.headers!.Cookie = cookie;
    }
    store.dispatch(loadMyInfoRequest());
    store.dispatch(END);
    await (store as Store).sagaTask?.toPromise();

    return {
      props: {
        allPostsData: {},
      },
    };
  });

export default Friends;
