import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loadProfile } from '@/../reducers/profile';
import { Menu, ProfileMenuType } from '@/../@types/utils';

import { useQuery } from 'react-query';
import axios from 'axios';
import { loadProfileAPI } from '@/api/user';
import {
  AppLayout,
  SideBar,
  Info,
  MoreInfo,
  Row,
  Col,
} from '../../src/components/organisms';
import MatchingCalendar from '../../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../../src/components/organisms/profile/MatchingRecord';
import LikedList from '../../src/components/organisms/profile/LikedList';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

  const {
    data: profile,
    isFetched,
    dataUpdatedAt,
  } = useQuery(['profile', id], () => loadProfileAPI(id), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isFetched) {
      dispatch(loadProfile(profile));
    }
  }, [dataUpdatedAt]);

  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SideBar profileMenu={profileMenu} setProfileMenu={setProfileMenu} />
        </Col>
        <Col xs={24} md={16}>
          {
            {
              [Menu.LIKED]: <LikedList isProfile />,
              [Menu.CALENDAR]: <MatchingCalendar isProfile />,
              [Menu.RECORD]: <MatchingRecord isProfile />,
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

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async ({ req }) => {
//     const cookie = req ? req.headers.cookie : '';
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     axios!.defaults!.headers!.Cookie = '';
//     if (req && cookie) {
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       axios!.defaults!.headers!.Cookie = cookie;
//     }
//     store.dispatch(loadMyInfoRequest());
//     store.dispatch(END);
//     await (store as Store).sagaTask?.toPromise();

//     return {
//       props: {
//         allPostsData: {},
//       },
//     };
//   });

export default Profile;
