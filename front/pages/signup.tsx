import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { signupSelector, userSelector } from '../reducers/user';
import { AppLayout } from '@/components/organisms';
import { Steps } from '@/components/molecules';
import styles from '../src/scss/signup.module.scss';
import InfoForm from '@/components/organisms/signup/InfoForm';
import MoreInfoForm from '@/components/organisms/signup/MoreInfoForm';
import MoreGymInfoForm from '@/components/organisms/signup/MoreGymInfoForm';
import FriendsInfoForm from '@/components/organisms/signup/FriendsInfoForm';
import { SignupMenuType, SignupMenu, SignupSteps } from '../@types/utils';

const Signup = () => {
  const { me } = useSelector(userSelector);
  const { signupProcess }: { signupProcess: SignupMenuType } = useSelector(signupSelector);
  const router = useRouter();
  useEffect(() => {
    if (me?.id) {
      router.replace('/');
    }
  }, [me?.id]);

  return (
    <AppLayout>
      <div className={styles.signupLayout}>
        <Steps
          steps={SignupSteps}
          process={signupProcess}
          target={SignupSteps.findIndex(({ step }) => step === signupProcess)}
        />
        <div className={styles.contentsWrap}>
          {{
            [SignupMenu.INFO]: <InfoForm />,
            [SignupMenu.MOREINFO]: <MoreInfoForm />,
            [SignupMenu.GYMINFO]: <MoreGymInfoForm />,
            [SignupMenu.FRIENDSINFO]: <FriendsInfoForm />,
          }[signupProcess]}
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
