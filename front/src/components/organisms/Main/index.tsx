/* eslint-disable no-undef */
import React from 'react';
import { END } from 'redux-saga';
import { GetServerSideProps } from 'next';
import MainBanner from './MainBanner';
import RankedFriends from './RankedFriends';
import RealTimeMatchingCouple from './RealTimeMatchingCouple';
import wrapper from '../../../../store/configureStore';
import axios from 'axios';

import { Store } from 'redux';
import { MainBannerWrap, MainBodyWrap, MainWrap } from './style';
import { loadMyInfoRequest } from '@/../reducers/user';

const Main = () => (
  <MainWrap>
    <MainBannerWrap>
      <MainBanner />
    </MainBannerWrap>
    <MainBodyWrap>
      <RankedFriends />
      <RealTimeMatchingCouple />
    </MainBodyWrap>
  </MainWrap>
);

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

export default Main;
