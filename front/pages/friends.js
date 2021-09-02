import { Col, Row } from 'antd';
import React from 'react';

import AppLayout from '../src/components/organisms/AppLayout';
import SearchGyms from '../src/components/organisms/SearchGyms';
import SearchMap from '../src/components/organisms/SearchMap';
// import { SearchWrapper } from '../src/components/organisms/SearchFriends/style';

const Friends = () => {
  console.log('Friends');
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
