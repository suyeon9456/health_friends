import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AppLayout } from '@/components/organisms';
import { Steps } from '@/components/molecules';
import InfoForm from '@/components/organisms/signup/InfoForm';
import MoreInfoForm from '@/components/organisms/signup/MoreInfoForm';
import MoreGymInfoForm from '@/components/organisms/signup/MoreGymInfoForm';
import FriendsInfoForm from '@/components/organisms/signup/FriendsInfoForm';
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from '../src/scss/signup.module.scss';
import { signupSelector } from '../reducers/user';
import { SignupMenuType, SignupMenu, SignupSteps } from '../@types/utils';
import { Me } from '../@types/user';

const Signup = () => {
  const { data: me, isLoading } = useQuery<Me>('user', async () => {
    const { data } = await axios.get('/user');
    return data;
  });
  const { signupProcess }: { signupProcess: SignupMenuType } =
    useSelector(signupSelector);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && me?.id) {
      void router.replace('/');
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
  );
};

export default Signup;
