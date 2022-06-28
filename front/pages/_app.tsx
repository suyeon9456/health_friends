import React, { useEffect, useReducer, useRef } from 'react';
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
import * as gtag from '../lib/gtag';

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
    console.log('?');
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
