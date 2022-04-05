import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useQuery } from 'react-query';
import { loadProfileMyinfoRequest } from '../reducers/profile';

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
import { useModalDispatch } from '../store/modalStore';
import { Me } from '../@types/user';

const Myinfo = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();

  const { data: me, isLoading } = useQuery<Me>('user', async () => {
    const { data } = await axios.get('/user');
    return data;
  });
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

  const goMain = useCallback(() => router.push('/'), []);

  useEffect(() => {
    if (!isLoading && !me) {
      contextDispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: GlobalModal.ALERT,
          statusType: ModalStatus.WARNING,
          message: '로그인 후 사용가능 합니다.',
          block: true,
          callback: goMain,
        },
      });
      return;
    }
    dispatch(loadProfileMyinfoRequest());
  }, [me]);

  return (
    <AppLayout>
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

export default Myinfo;
