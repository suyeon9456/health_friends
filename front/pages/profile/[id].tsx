import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import wrapper from '../../store/configureStore';

import { AppLayout, SideBar, Info, MoreInfo, Row, Col } from '../../src/components/organisms';
import MatchingCalendar from '../../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../../src/components/organisms/profile/MatchingRecord';
import LikedList from '../../src/components/organisms/profile/LikedList';

import { GetServerSideProps } from 'next';
import { Store } from 'redux';
import { LOAD_MY_INFO_REQUEST, LOAD_PROFILE_INFO_REQUEST } from '@/../@types/utils';

const menu = {
  INFO: 'INFO',
  RECORD: 'RECORD',
  CALENDAR: 'CALENDAR',
  LIKED: 'LIKED',
} as const;

type ProfileMenuType = typeof menu[keyof typeof menu];

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(menu.INFO);

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
            [menu.LIKED]: <LikedList />,
            [menu.CALENDAR]: <MatchingCalendar />,
            [menu.RECORD]: <MatchingRecord />,
            [menu.INFO]: (
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

export const getServerSideProps: GetServerSideProps = wrapper
  .getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios!.defaults!.headers!.Cookie = '';
    if (req && cookie) {
      axios!.defaults!.headers!.Cookie = cookie;
    }
    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch(END);
    await (store as Store).sagaTask!.toPromise();

    return {
      props: {
        allPostsData: {},
      },
    };
  });

export default Profile;
