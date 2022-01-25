import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';

import AppLayout from '../../src/components/organisms/AppLayout';
import SideBar from '../../src/components/organisms/profile/SideBar';
import Info from '../../src/components/organisms/profile/Info';
import MoreInfo from '../../src/components/organisms/profile/MoreInfo';
import MatchingCalendar from '../../src/components/organisms/profile/MatchingCalendar';
import { LOAD_MY_INFO_REQUEST, LOAD_PROFILE_INFO_REQUEST, LOAD_PROFILE_MYINFO_REQUEST } from '../../reducers/user';
import MatchingRecord from '../../src/components/organisms/profile/MatchingRecord';
import LikedList from '../../src/components/organisms/profile/LikedList';
import Row from '../../src/components/organisms/Row';
import Col from '../../src/components/organisms/Col';
import { Alert } from '../../src/components/molecules';
import { Button } from '../../src/components/atoms';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const [isNotloggedIn, setIsNotloggedIn] = useState(false);
  const { id } = router.query;

  const [profileMenu, setProfileMenu] = useState('info');

  useEffect(() => {
    if (id === 'myinfo' && !me) {
      setIsNotloggedIn(true);
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (id === 'myinfo') {
      return dispatch({ type: LOAD_PROFILE_MYINFO_REQUEST });
    }
    dispatch({
      type: LOAD_PROFILE_INFO_REQUEST,
      data: id,
    });
  }, [id]);

  const useRouterMain = useCallback(async () => {
    await setIsNotloggedIn(false);
    router.push('/');
  }, [isNotloggedIn]);
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
      <Alert
        show={isNotloggedIn}
        type="warning"
        action={(
          <Button
            type="warning"
            onClick={useRouterMain}
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
