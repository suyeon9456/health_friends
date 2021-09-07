import React, { useState, useCallback } from 'react';
// import { Row, Col } from 'antd';

import AppLayout from '../src/components/organisms/AppLayout';
import SearchGyms from '../src/components/organisms/SearchGyms';
import SearchMap from '../src/components/organisms/SearchMap';
import Row from '../src/components/organisms/Row';
import Col from '../src/components/organisms/Col';

// if (window.scrollY + document.documentElement.clientHeight
//   > document.documentElement.scrollHeight) {

const Friends = () => {
  const [foldedGym, setFoldedGym] = useState(false);
  const changeFoldedGym = useCallback(() => {
    setFoldedGym((prev) => !prev);
  }, [foldedGym]);

  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SearchGyms
            foldedGym={foldedGym}
            changeFoldedGym={changeFoldedGym}
          />
        </Col>
        <Col xs={24} md={16}>
          <SearchMap />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Friends;
