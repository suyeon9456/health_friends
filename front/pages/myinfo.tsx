import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { GetServerSidePropsContext } from 'next';
import { useQuery } from 'react-query';
import { loadLoginedUserAPI } from '@/api/user';
import { loadMyinfoAPI } from '@/api/profile';
import { useRouter } from 'next/router';
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
import {
  GlobalModal,
  Menu,
  ModalStatus,
  ProfileMenuType,
} from '../@types/utils';
import { meKey, profileKey } from '../@utils/queryKey';
import { useModalDispatch } from '../store/modalStore';
import { Me } from '../@types/user';
import { loadMe } from '../reducers/user';

const Myinfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

  const _ = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => dispatch(loadMe(data)),
  });

  const _profile = useQuery(profileKey, () => loadMyinfoAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => dispatch(loadProfile(data)),
    onError: () =>
      contextDispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: GlobalModal.ALERT,
          statusType: ModalStatus.ERROR,
          message: '존재하지 않는 사용자입니다.',
          block: true,
          callback: () => router.replace('/'),
        },
      }),
  });

  const page = useMemo(() => {
    return router.query.tab !== undefined ? router.query.tab : Menu.INFO;
  }, [router.query]);

  useEffect(() => setProfileMenu(page as ProfileMenuType), [page]);

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
