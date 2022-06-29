import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import { AppLayout } from '@/components/organisms';
import { Steps } from '@/components/molecules';
import InfoForm from '@/components/organisms/signup/InfoForm';
import MoreInfoForm from '@/components/organisms/signup/MoreInfoForm';
import MoreGymInfoForm from '@/components/organisms/signup/MoreGymInfoForm';
import FriendsInfoForm from '@/components/organisms/signup/FriendsInfoForm';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import styles from '../src/scss/signup.module.scss';
import { signupSelector } from '../reducers/user';
import { SignupMenuType, SignupMenu, SignupSteps } from '../@types/utils';

const Signup = () => {
  const { signupProcess }: { signupProcess: SignupMenuType } =
    useSelector(signupSelector);

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AppLayout>
        <div className={styles.signupLayout}>
          <Steps
            steps={SignupSteps}
            process={signupProcess}
            target={SignupSteps.findIndex(({ step }) => step === signupProcess)}
          />
          <div className={styles.contentsWrap}>
            {
              {
                [SignupMenu.INFO]: <InfoForm />,
                [SignupMenu.MOREINFO]: <MoreInfoForm />,
                [SignupMenu.GYMINFO]: <MoreGymInfoForm />,
                [SignupMenu.FRIENDSINFO]: <FriendsInfoForm />,
              }[signupProcess]
            }
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  axios.defaults.headers!.Cookie = '';
  if (context.req && cookie) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    axios.defaults.headers!.Cookie = cookie;
  }
  const { data } = await axios.get('/user');
  if (data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signup;
