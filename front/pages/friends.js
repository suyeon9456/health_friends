import React, { useState } from 'react';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { AppLayout, SearchGyms, SearchMap, Row, Col } from '../src/components/organisms';

const Friends = () => {
  const [foldedFriends, setFoldedFriends] = useState(true);
  const [foldedGym, setFoldedGym] = useState(false);

  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={(foldedGym && foldedFriends) ? 1 : 8}>
          <SearchGyms
            foldedFriends={foldedFriends}
            setFoldedFriends={setFoldedFriends}
            foldedGym={foldedGym}
            setFoldedGym={setFoldedGym}
          />
        </Col>
        <Col xs={24} md={(foldedGym && foldedFriends) ? 23 : 16}>
          <SearchMap
            foldedFriends={foldedFriends}
            setFoldedFriends={setFoldedFriends}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Friends;
