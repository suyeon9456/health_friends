import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const App = ({ Component }) => {
  // Component는 index.js 의 리턴 부분
  console.log('App');
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>health-friends</title>
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b59bfdf3af450270c49c69d14f47cdd5&libraries=services" />
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
