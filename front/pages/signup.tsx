import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'next/router';

import { RootState } from '../store/configureStore';

import { AppLayout } from '@/components/organisms';
import { Steps } from '@/components/molecules';
import styles from '../src/scss/signup.module.scss';
import InfoForm from '@/components/organisms/signup/InfoForm';
import MoreInfoForm from '@/components/organisms/signup/MoreInfoForm';
import MoreGymInfoForm from '@/components/organisms/signup/MoreGymInfoForm';
import FriendsInfoForm from '@/components/organisms/signup/FriendsInfoForm';

const Signup = () => {
  const { signupSteps, signupProcess, me } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (me?.id) {
      console.log(Router);
      Router.replace('/');
    }
  }, [me?.id]);

  return (
    <AppLayout>
      <div className={styles.signupLayout}>
        <Steps
          steps={signupSteps}
          process={signupProcess}
        />
        <div className={styles.contentsWrap}>
          {{ 1: <InfoForm />,
            2: <MoreInfoForm />,
            3: <MoreGymInfoForm />,
            4: <FriendsInfoForm /> }[signupProcess]}
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
