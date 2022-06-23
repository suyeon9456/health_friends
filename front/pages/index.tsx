import { loadRankingAPI, loadRealtimeAPI, loadRecommendAPI } from '@/api/user';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { recommendKey } from '../@utils/queryKey';

import { AppLayout, Main, Footer } from '../src/components/organisms';

const Home = () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>health-friends</title>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b59bfdf3af450270c49c69d14f47cdd5&libraries=services"
      />
    </Head>
    <AppLayout spanNumber={24}>
      <Main />
      <Footer />
    </AppLayout>
  </>
);

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async ({ req }) => {
//     /*
//       ssr에서 브라우저는 개입하지 않고 프론트에서 백으로 요청하기 때문에
//       쿠키를 따로 설정하여 요청하여야 한다.
//     */
//     // const cookie = req ? req.headers.cookie : '';
//     // axios.defaults.headers.Cookie = cookie;

//     /*
//       하지만 위 방식으로만 작업할 경우 치명적인 오류가 생긴다.
//       그 오류는 front 서버는 하나이기 때문에 한 유저의 cookie가 등록될 경우 다른 유저에게도 공유된다는 것이다.
//       즉 누군가 로그인을 하고난 후 다른 유저가 사이트에 방문했을 때 처음 로그인한 유저의 정보로 로그인 되어있는 상태가 발생한다.
//       따라서 아래와 같이 설정해 주는 것이 중요하다.
//     */
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['realtime'], () => loadRealtimeAPI());
  await queryClient.prefetchQuery(['ranking'], () => loadRankingAPI());
  await queryClient.prefetchQuery(recommendKey(), () => loadRecommendAPI());
  // await queryClient.prefetchQuery(meKey, () => loadLoginedUserAPI());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
