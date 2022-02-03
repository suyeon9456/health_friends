import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST, LOAD_PROFILE_INFO_REQUEST } from '../../reducers/user';

import { AppLayout, SideBar, Info, MoreInfo, Row, Col } from '../../src/components/organisms';
import MatchingCalendar from '../../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../../src/components/organisms/profile/MatchingRecord';
import LikedList from '../../src/components/organisms/profile/LikedList';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const [profileMenu, setProfileMenu] = useState('info');

  useEffect(() => {
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
            liked: <LikedList />,
            calendar: <MatchingCalendar />,
            record: <MatchingRecord />,
            info: (
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Profile;
