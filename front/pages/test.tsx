import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { AppContext } from 'next/app';
import styles from '../src/scss/signup.module.scss';
import { signupSelector } from '../reducers/user';
import { SignupMenuType, SignupMenu, SignupSteps } from '../@types/constant';

const Test = () => {
  const { signupProcess }: { signupProcess: SignupMenuType } =
    useSelector(signupSelector);
  return <div />;
};

Test.getInitialProps = async (context: AppContext) => {
  console.log('? 클라이언트에서 실행된다?');
  const res = await axios('https://api.github.com/repos/zeit/next.js');
};

export default Test;
