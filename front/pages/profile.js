import React from 'react';
import { Col, Row } from 'antd';

import AppLayout from '../src/components/organisms/AppLayout';
import SideBar from '../src/components/organisms/profile/SideBar';
import Info from '../src/components/organisms/profile/Info';
import MoreInfo from '../src/components/organisms/profile/MoreInfo';

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
          <MoreInfo />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
