import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';

import AppLayout from '../../src/components/organisms/AppLayout';
import SideBar from '../../src/components/organisms/profile/SideBar';
import Info from '../../src/components/organisms/profile/Info';
import MoreInfo from '../../src/components/organisms/profile/MoreInfo';
import { LOAD_MY_INFO_REQUEST, LOAD_PROFILE_INFO_REQUEST } from '../../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    console.log(id);
    dispatch({
      type: LOAD_PROFILE_INFO_REQUEST,
      data: id,
    });
  }, [id]);
  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SideBar />
        </Col>
        <Col xs={24} md={16}>
          <Info />
          {/* <MoreInfo /> */}
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
