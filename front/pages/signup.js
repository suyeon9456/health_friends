import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

import Steps from '../src/components/molecules/Steps';
import AppLayout from '../src/components/organisms/AppLayout';
import InfoForm from '../src/components/organisms/signup/InfoForm';
import MoreInfoForm from '../src/components/organisms/signup/MoreInfoForm';
import FriendsInfoForm from '../src/components/organisms/signup/FriendsInfoForm';
import MoreGymInfoForm from '../src/components/organisms/signup/MoreGymInfoForm';

import styles from '../src/scss/signup.module.scss';

const Signup = () => {
  const steps = [
    { id: 1, type: 'finished', step: 1, title: 'STEP1', description: '회원 정보' },
    { id: 2, type: 'process', step: 2, title: 'STEP2', description: '추가 정보' },
    { id: 3, type: 'wait', step: 3, title: 'STEP3', description: '추가 정보' },
    { id: 4, type: 'wait', step: 4, title: 'STEP4', description: '매칭되고 싶은 친구 정보' },
  ];
  const [process, setProcess] = useState(1);

  return (
    <AppLayout>
      <div className={styles.signupLayout}>
        <Steps
          steps={steps}
          process={process}
        />
        <div className={styles.contentsWrap}>
          {{
            1: <InfoForm setProcess={setProcess} />,
            2: <MoreInfoForm setProcess={setProcess} />,
            3: <MoreGymInfoForm />,
            4: <FriendsInfoForm />,
          }[process]}
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
