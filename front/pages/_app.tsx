import React, { useReducer, useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/scss/css/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GlobalModal from '@/components/organisms/GlobalModal';
import ErrorBoundary from '@/components/organisms/ErrorBoundary';
import wrapper from '../store/configureStore';
import {
  ShowStateContext,
  reducer,
  ShowDispatchContext,
} from '../store/contextStore';
import {
  UseModalStateContext,
  modalReducer,
  UseModalDispatchContext,
} from '../store/modalStore';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const [state, dispatch] = useReducer(reducer, { drawerShow: false });
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    basic: [],
    custom: [],
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <ShowStateContext.Provider value={state}>
        <ShowDispatchContext.Provider value={dispatch}>
          <UseModalStateContext.Provider value={modalState}>
            <UseModalDispatchContext.Provider value={modalDispatch}>
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
            </UseModalDispatchContext.Provider>
          </UseModalStateContext.Provider>
        </ShowDispatchContext.Provider>
      </ShowStateContext.Provider>
    </>
  );
};
export default wrapper.withRedux(App);
