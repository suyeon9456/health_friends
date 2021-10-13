import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppLayout from '../src/components/organisms/AppLayout';
import SearchGyms from '../src/components/organisms/SearchGyms';
import SearchMap from '../src/components/organisms/SearchMap';
import Row from '../src/components/organisms/Row';
import Col from '../src/components/organisms/Col';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Friends = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SearchGyms />
        </Col>
        <Col xs={24} md={16}>
          <SearchMap />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Friends;
