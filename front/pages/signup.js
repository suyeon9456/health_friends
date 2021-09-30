import React from 'react';
import { useSelector } from 'react-redux';

import Steps from '../src/components/molecules/Steps';
import AppLayout from '../src/components/organisms/AppLayout';
import InfoForm from '../src/components/organisms/signup/InfoForm';
import MoreInfoForm from '../src/components/organisms/signup/MoreInfoForm';
import FriendsInfoForm from '../src/components/organisms/signup/FriendsInfoForm';
import MoreGymInfoForm from '../src/components/organisms/signup/MoreGymInfoForm';

import styles from '../src/scss/signup.module.scss';

const Signup = () => {
  const { signupSteps, signupProcess } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <div className={styles.signupLayout}>
        <Steps
          steps={signupSteps}
          process={signupProcess}
        />
        <div className={styles.contentsWrap}>
          {{
            1: <InfoForm />,
            2: <MoreInfoForm />,
            3: <MoreGymInfoForm />,
            4: <FriendsInfoForm />,
          }[signupProcess]}
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
