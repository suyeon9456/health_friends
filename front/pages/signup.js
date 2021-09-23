import React, { useCallback, useState } from 'react';

import Steps from '../src/components/molecules/Steps';
import AppLayout from '../src/components/organisms/AppLayout';
import InfoForm from '../src/components/organisms/signup/InfoForm';
import Button from '../src/components/atoms/Button';
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

  const onPrevClick = useCallback(() => {
    setProcess((prev) => prev - 1);
  }, [process]);
  const onNextClick = useCallback(() => {
    setProcess((prev) => prev + 1);
  }, [process]);

  return (
    <AppLayout>
      <div className={styles.signupLayout}>
        <Steps
          steps={steps}
          process={process}
        />
        <div className={styles.contentsWrap}>
          {{
            1: <InfoForm />,
            2: <MoreInfoForm />,
            3: <MoreGymInfoForm />,
            4: <FriendsInfoForm />,
          }[process]}
        </div>
        <div className={styles.buttonWrap}>
          <Button
            type="primary"
            size="large"
            className={styles.button}
            disabled={process <= 1}
            onClick={onPrevClick}
          >
            이전단계
          </Button>
          <Button
            type="line-primary"
            size="large"
            className={styles.button}
            disabled={process >= 4}
            onClick={onNextClick}
          >
            다음단계
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
