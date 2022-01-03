import React from 'react';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import AppLayout from '../src/components/organisms/AppLayout';
import Main from '../src/components/organisms/Main';
import Footer from '../src/components/organisms/Footer';

import wrapper from '../store/configureStore';

const Home = () => (
  <AppLayout spanNumber={24}>
    <div>
      <Main />
    </div>
    {/* <DrawerMenu drawerShow={drawerShow} /> */}
    <Footer />
  </AppLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  /*
    ssr에서 브라우저는 개입하지 않고 프론트에서 백으로 요청하기 때문에
    쿠키를 따로 설정하여 요청하여야 한다.
  */
  // const cookie = req ? req.headers.cookie : '';
  // axios.defaults.headers.Cookie = cookie;

  /*
    하지만 위 방식으로만 작업할 경우 치명적인 오류가 생긴다.
    그 오류는 front 서버는 하나이기 때문에 한 유저의 cookie가 등록될 경우 다른 유저에게도 공유된다는 것이다.
    즉 누군가 로그인을 하고난 후 다른 유저가 사이트에 방문했을 때 처음 로그인한 유저의 정보로 로그인 되어있는 상태가 발생한다.
    따라서 아래와 같이 설정해 주는 것이 중요하다.
  */
  console.log('req', req);
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

export default Home;
