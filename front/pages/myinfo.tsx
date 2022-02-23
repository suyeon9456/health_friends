import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { Store } from 'redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import wrapper, { RootState } from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST, LOAD_PROFILE_MYINFO_REQUEST } from '../reducers/user';

import { Button } from '../src/components/atoms';
import { Alert } from '../src/components/molecules';
import { AppLayout, SideBar, Info, MoreInfo, Row, Col } from '../src/components/organisms';
import MatchingCalendar from '../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../src/components/organisms/profile/MatchingRecord';
import LikedList from '../src/components/organisms/profile/LikedList';

const menu = {
  INFO: 'INFO',
  RECORD: 'RECORD',
  CALENDAR: 'CALENDAR',
  LIKED: 'LIKED',
} as const;

type ProfileMenuType = typeof menu[keyof typeof menu];

const Myinfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { me } = useSelector((state: RootState) => state.user);
  const [isNotloggedIn, setIsNotloggedIn] = useState(false);
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(menu.INFO);

  useEffect(() => {
    if (!me) {
      return setIsNotloggedIn(true);
    }
    dispatch({ type: LOAD_PROFILE_MYINFO_REQUEST });
  }, [me]);

  const goMain = useCallback(() => {
    setIsNotloggedIn(false);
    router.push('/');
  }, []);
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
      <Alert
        show={isNotloggedIn}
        type="warning"
        action={(
          <Button
            type="warning"
            onClick={goMain}
            block
          >
            확인
          </Button>
        )}
        message="로그인 후 사용가능 합니다."
      />
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

export default Myinfo;
