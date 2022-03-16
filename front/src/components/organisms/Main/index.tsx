/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-undef */
import React from 'react';
import { END } from 'redux-saga';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Store } from 'redux';
import { loadMyInfoRequest } from '@/../reducers/user';
import MainBanner from './MainBanner';
import RankedFriends from './RankedFriends';
import RealTimeMatchingCouple from './RealTimeMatchingCouple';
import wrapper from '../../../../store/configureStore';

import { MainBannerWrap, MainBodyWrap, MainWrap } from './style';

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
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

export default Main;
