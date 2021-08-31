import React from 'react';
import { Col, Row } from 'antd';

import AppLayout from '../src/components/organisms/AppLayout';
import SideBar from '../src/components/organisms/profile/SideBar';

const Profile = () => {
  console.log('profile');
  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SideBar />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
