import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';

import AppLayout from '../../src/components/organisms/AppLayout';
import SideBar from '../../src/components/organisms/profile/SideBar';
import Info from '../../src/components/organisms/profile/Info';
import MoreInfo from '../../src/components/organisms/profile/MoreInfo';
import MatchingCalendar from '../../src/components/organisms/profile/MatchingCalendar';
import { LOAD_MY_INFO_REQUEST, LOAD_PROFILE_INFO_REQUEST } from '../../reducers/user';
import MatchingRecord from '../../src/components/organisms/profile/MatchingRecord';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [profileMenu, setProfileMenu] = useState('profile');

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
          <SideBar
            profileMenu={profileMenu}
            setProfileMenu={setProfileMenu}
          />
        </Col>
        <Col xs={24} md={16}>
          {{
            calendar: <MatchingCalendar />,
            record: <MatchingRecord />,
            profile: (
              <div>
                <Info />
                <MoreInfo />
              </div>
            ),
          }[profileMenu]}
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
