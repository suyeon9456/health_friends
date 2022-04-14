import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { GetServerSidePropsContext } from 'next';
import { useQuery } from 'react-query';
import { loadMyinfoAPI } from '@/api/user';
import { loadProfile } from '../reducers/profile';

import {
  AppLayout,
  SideBar,
  Info,
  MoreInfo,
  Row,
  Col,
} from '../src/components/organisms';
import MatchingCalendar from '../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../src/components/organisms/profile/MatchingRecord';
import LikedList from '../src/components/organisms/profile/LikedList';
import { Menu, ProfileMenuType } from '../@types/utils';
import { profileKey } from '../@types/queryKey';

const Myinfo = () => {
  const dispatch = useDispatch();
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

  const {
    data: profile,
    isFetched,
    dataUpdatedAt,
  } = useQuery(profileKey, () => loadMyinfoAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isFetched) {
      dispatch(loadProfile(profile));
    }
  }, [dataUpdatedAt]);

  return (
    <AppLayout childBlock>
      <Row>
        <Col xs={24} md={8}>
          <SideBar profileMenu={profileMenu} setProfileMenu={setProfileMenu} />
        </Col>
        <Col xs={24} md={16}>
          {
            {
              [Menu.LIKED]: <LikedList />,
              [Menu.CALENDAR]: <MatchingCalendar />,
              [Menu.RECORD]: <MatchingRecord />,
              [Menu.INFO]: (
                <div>
                  <Info />
                  <MoreInfo />
                </div>
              ),
            }[profileMenu]
          }
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  axios.defaults.headers!.Cookie = '';
  if (context.req && cookie) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios.defaults.headers!.Cookie = cookie;
  }
  const { data } = await axios.get('/user');
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Myinfo;
