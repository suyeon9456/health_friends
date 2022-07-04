import React from 'react';
import { useSelector } from 'react-redux';

import { SignupMenuType, SignupSteps } from '@/../@types/constant';
import { signupSelector } from '@/../reducers/user';
import { Steps } from '@/components/molecules';

const SignupAllStep = () => {
  const { signupProcess }: { signupProcess: SignupMenuType } =
    useSelector(signupSelector);
  return (
    <Steps
      steps={SignupSteps}
      process={signupProcess}
      target={SignupSteps.findIndex(({ step }) => step === signupProcess)}
    />
  );
};

export default SignupAllStep;
