import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const App = ({ Component }) => {
  // Component는 index.js 의 리턴 부분
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>health-friends</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
