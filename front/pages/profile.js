import React from 'react';
import { Col, Row } from 'antd';

import AppLayout from '../src/components/organisms/AppLayout';
import SideBar from '../src/components/organisms/profile/SideBar';
import Info from '../src/components/organisms/profile/Info';

const Profile = () => {
  console.log('profile');
  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SideBar />
        </Col>
        <Col xs={24} md={16}>
          <Info />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
