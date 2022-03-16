/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React from 'react';
import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';
import axios from 'axios';

import { Store } from 'redux';
import { AppLayout, Main, Footer } from '../src/components/organisms';

import wrapper from '../store/configureStore';

import { loadMyInfoRequest } from '../reducers/user';

const Home = () => (
  <AppLayout spanNumber={24}>
    <div>
      <Main />
    </div>
    <Footer />
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
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
    const cookie = req ? req.headers.cookie : '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios!.defaults!.headers!.Cookie = '';
    if (req && cookie) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      axios!.defaults!.headers!.Cookie = cookie;
    }
    store.dispatch(loadMyInfoRequest());
    store.dispatch(END);
    await (store as Store).sagaTask?.toPromise();
    return {
      props: {
        allPostsData: {},
      },
    };
  });

export default Home;
