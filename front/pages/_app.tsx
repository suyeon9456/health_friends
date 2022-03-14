import React, { useReducer } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/scss/css/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import wrapper from '../store/configureStore';
import { ShowStateContext, reducer, ShowDispatchContext } from '../store/contextStore';
import { UseModalStateContext, modalReducer, UseModalDispatchContext } from '../store/modalStore';
import { myTheme } from '../src/styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalModal from '@/components/organisms/GlobalModal';

const queryClient = new QueryClient();
const App = ({ Component }: AppProps) => { // Component는 index.js 의 리턴 부분
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
        <script src="https://developers.kakao.com/sdk/js/kakao.js" />
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b59bfdf3af450270c49c69d14f47cdd5&libraries=services" />
      </Head>
      <ShowStateContext.Provider value={state}>
        <ShowDispatchContext.Provider value={dispatch}>
          <UseModalStateContext.Provider value={modalState}>
            <UseModalDispatchContext.Provider value={modalDispatch}>
              <ThemeProvider theme={myTheme}>
                <QueryClientProvider client={queryClient}>
                  <Component />
                  <GlobalModal modals={modalState.basic} />
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
