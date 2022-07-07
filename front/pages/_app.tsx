import React, { Suspense, useEffect, useReducer, useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/scss/css/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GlobalModal from '@/components/organisms/GlobalModal';
import { useRouter } from 'next/router';
import wrapper from '../store/configureStore';
import {
  ModalStateContext,
  modalReducer,
  ModalDispatchContext,
  initialState,
} from '../store/modalStore';
import * as gtag from '../@utils/gtag';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          useErrorBoundary: true,
        },
      },
    });
  }
  const [modalState, modalDispatch] = useReducer(modalReducer, initialState);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta property="og:title" content="health-friends" />
        <meta
          property="og:image"
          content="https://img.health-friends.com/_next/images/logo.png"
        />
        <meta
          property="og:description"
          content="내가 이용하는 헬스장에서 운동하는 친구 찾아 함께 운동 해보자"
        />
        <meta
          name="description"
          content="내가 이용하는 헬스장에서 운동하는 친구 찾아 함께 운동 해보자"
        />
      </Head>
      <ModalStateContext.Provider value={modalState}>
        <ModalDispatchContext.Provider value={modalDispatch}>
          <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <GlobalModal modals={modalState.basic} />
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </Hydrate>
          </QueryClientProvider>
        </ModalDispatchContext.Provider>
      </ModalStateContext.Provider>
    </>
  );
};
export default wrapper.withRedux(App);
