import React, { useReducer, useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/scss/css/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ThemeProvider } from 'styled-components';
import GlobalModal from '@/components/organisms/GlobalModal';
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
import { myTheme } from '../src/styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  // Component는 index.js 의 리턴 부분
  const [state, dispatch] = useReducer(reducer, { drawerShow: false });
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    basic: [],
    custom: [],
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>health-friends</title>
        {/* <script src="https://developers.kakao.com/sdk/js/kakao.js" /> */}
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b59bfdf3af450270c49c69d14f47cdd5&libraries=services"
        />
      </Head>
      <ShowStateContext.Provider value={state}>
        <ShowDispatchContext.Provider value={dispatch}>
          <UseModalStateContext.Provider value={modalState}>
            <UseModalDispatchContext.Provider value={modalDispatch}>
              <ThemeProvider theme={myTheme}>
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
              </ThemeProvider>
            </UseModalDispatchContext.Provider>
          </UseModalStateContext.Provider>
        </ShowDispatchContext.Provider>
      </ShowStateContext.Provider>
    </>
  );
};

export default wrapper.withRedux(App);
