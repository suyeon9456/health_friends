import React, { useState, useCallback } from 'react';

import AppLayout from '../src/components/organisms/AppLayout';
import SearchGyms from '../src/components/organisms/SearchGyms';
import SearchMap from '../src/components/organisms/SearchMap';
import Row from '../src/components/organisms/Row';
import Col from '../src/components/organisms/Col';

const Friends = () => (
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

export default Friends;
