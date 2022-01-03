import React, { useReducer } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/scss/css/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import wrapper from '../store/configureStore';
import { ShowStateContext, reducer, initialState, ShowDispatchContext } from '../store/contextStore';

const App = ({ Component }) => {
  // Component는 index.js 의 리턴 부분
  console.log('App');
  const [state, dispatch] = useReducer(reducer, initialState);
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
          <Component />
        </ShowDispatchContext.Provider>
      </ShowStateContext.Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
