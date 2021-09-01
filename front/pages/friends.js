import { Col, Row } from 'antd';
import Search from 'antd/lib/transfer/search';
import React from 'react';

import AppLayout from '../src/components/organisms/AppLayout';
import SearchFriends from '../src/components/organisms/SearchFriends';
// import { SearchWrapper } from '../src/components/organisms/SearchFriends/style';

const Friends = () => {
  console.log('Friends');
  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={12}>
          {/* <SideBar /> */}
          <SearchFriends />
        </Col>
        {/* <Col xs={24} md={16}>
          <Info />
          <MoreInfo />
        </Col> */}
      </Row>
    </AppLayout>
  );
};

export default Friends;
