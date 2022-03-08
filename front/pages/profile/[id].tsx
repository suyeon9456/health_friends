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
import { loadMyInfoRequest } from '@/../reducers/user';
import { loadProfileInfoRequest } from '@/../reducers/profile';
import { Menu, ProfileMenuType } from '@/../@types/utils';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

  useEffect(() => {
    dispatch(loadProfileInfoRequest(id));
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
            [Menu.LIKED]: <LikedList />,
            [Menu.CALENDAR]: <MatchingCalendar />,
            [Menu.RECORD]: <MatchingRecord />,
            [Menu.INFO]: (
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
    store.dispatch(loadMyInfoRequest());
    store.dispatch(END);
    await (store as Store).sagaTask!.toPromise();

    return {
      props: {
        allPostsData: {},
      },
    };
  });

export default Profile;
